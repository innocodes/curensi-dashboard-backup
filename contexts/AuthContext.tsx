'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { UserProfile } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async (uid: string, currentUser: User | null, retries = 3) => {
    console.log('🔍 getUserProfile called with:', { uid, currentUser: !!currentUser, email: currentUser?.email, retries });

    // First, create a basic profile in memory immediately
    const basicProfile: UserProfile = {
      uid,
      email: currentUser?.email || '',
      displayName: currentUser?.displayName || undefined,
      subscriptionTier: 'free',
      subscriptionStatus: 'active',
      notifications: {
        email: false,
        push: false,
        threshold: 20,
      },
      preferences: {
        defaultSymbols: ['BTC', 'ETH', 'SOL'],
        preferredExchanges: ['Binance', 'Bybit', 'OKX'],
        refreshInterval: 300,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      if (!db || !currentUser) {
        console.error('❌ Firestore not initialized, using basic profile only');
        setUserProfile(basicProfile);
        return basicProfile;
      }

      console.log('📊 Firestore initialized, checking user document...');
      const userDocRef = doc(db, 'users', uid);
      console.log('📄 Document reference created:', userDocRef.path);

      // Try Firestore with timeout
      try {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Firestore request timeout')), 5000);
        });

        const userDoc = await Promise.race([
          getDoc(userDocRef),
          timeoutPromise
        ]) as any;

        console.log('📖 getDoc completed, user document exists:', userDoc.exists());

        if (userDoc.exists()) {
          // User profile exists in Firestore
          console.log('✅ Found existing user profile in Firestore');
          const userProfile = userDoc.data() as UserProfile;
          console.log('👤 User profile data:', userProfile);
          setUserProfile(userProfile);
          return userProfile;
        } else {
          // Create new user profile in Firestore
          console.log('🆕 Creating new user profile in Firestore...');
          const newUserProfile = {
            ...basicProfile,
            createdAt: serverTimestamp() as any,
            updatedAt: serverTimestamp() as any,
          };

          await setDoc(userDocRef, newUserProfile);
          console.log('✅ User profile saved to Firestore successfully!');

          // Verify it was saved
          const savedDoc = await getDoc(userDocRef);
          console.log('🔍 Verification - Document exists after save:', savedDoc.exists());

          setUserProfile(newUserProfile);
          return newUserProfile;
        }
      } catch (firestoreError) {
        console.warn('⚠️ Firestore failed, using basic profile:', firestoreError.message);
        setUserProfile(basicProfile);
        return basicProfile;
      }

    } catch (error) {
      console.error('❌ Critical error in getUserProfile:', error);
      // Always return a basic profile as fallback
      setUserProfile(basicProfile);
      return basicProfile;
    }
  };

  useEffect(() => {
    // Only set up auth listener if Firebase is initialized
    console.log('🔥 AuthContext useEffect - Firebase initialization check');
    console.log('🔥 Firebase Auth available:', !!auth);
    console.log('🔥 Firebase Firestore available:', !!db);

    if (!auth) {
      console.warn('❌ Firebase Auth not available');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 Auth state changed:', {
        user: !!user,
        uid: user?.uid,
        email: user?.email,
        displayName: user?.displayName
      });

      setUser(user);
      setLoading(true);

      if (user) {
        console.log('✅ User authenticated, calling getUserProfile...');
        await getUserProfile(user.uid, user);
      } else {
        console.log('🚪 User signed out, clearing profile');
        setUserProfile(null);
      }

      console.log('🏁 Auth state change complete');
      setLoading(false);
    });

    return unsubscribe;
  }, [user, auth]);

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    if (!auth) throw new Error('Firebase Auth not available');
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await getUserProfile(user.uid, user);
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!db || !user) {
        throw new Error('Firestore not initialized or no current user');
      }

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      // Refresh the user profile after update
      await refreshUserProfile();
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
    refreshUserProfile,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}