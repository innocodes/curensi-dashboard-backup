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
import { auth } from '@/lib/firebase';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserProfile = async (uid: string) => {
    try {
      // For now, we'll create a basic profile client-side
      // In production, this would call the Firebase Function
      const userProfile: UserProfile = {
        uid,
        email: user?.email || '',
        displayName: user?.displayName || undefined,
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
          refreshInterval: 300, // 5 minutes
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setUserProfile(userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  useEffect(() => {
    // Only set up auth listener if Firebase is initialized
    if (!auth) {
      console.warn('Firebase Auth not available');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(true);

      if (user) {
        await getUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }

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
      await getUserProfile(user.uid);
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