# Funding Rate Arbitrage Platform

A modern, AI-powered funding rate arbitrage platform built with Next.js and Firebase. Discover market-neutral yield opportunities across major crypto exchanges.

## 🚀 Features

### Core Features
- **Real-time Funding Rates**: Live data from Binance, Bybit, OKX, and Gate.io
- **Market-Neutral Strategy**: Cash and carry arbitrage that profits regardless of market direction
- **AI-Powered Analysis**: Z-score statistical analysis for identifying significant opportunities
- **Historical Data**: Track funding rate trends over time
- **Smart Notifications**: Email alerts for premium opportunities

### Tier Features

#### Free Plan
- Top 10 funding opportunities
- Basic rate information
- 5-minute refresh interval
- Email support

#### Pro Plan ($29/month)
- Unlimited opportunities
- Historical data (7 days)
- Z-score analysis
- 1-minute refresh interval
- Email notifications
- Priority support

#### Premium Plan ($79/month)
- Everything in Pro
- Historical data (30 days)
- Advanced analytics
- API access
- Custom alerts
- Data export
- Dedicated support

## 🛠 Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Firebase Functions, Firestore, Authentication
- **Payments**: Paystack
- **Charts**: Recharts
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- Firebase CLI
- Firebase project
- Paystack account

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd funding-rate-arbitrage
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Firebase and Paystack credentials:
   - Firebase: Get from Firebase Console → Project Settings
   - Paystack: Get from Paystack Dashboard → Settings → API Keys

4. **Initialize Firebase**
   ```bash
   firebase login
   firebase init
   ```

5. **Deploy Firebase Functions**
   ```bash
   firebase deploy --only functions
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Configuration

### Firebase Configuration

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password and Google providers)
3. Set up Firestore database
4. Deploy Firebase Functions
5. Configure environment variables in Firebase Console for Functions

### Paystack Configuration

1. Create a Paystack account at https://paystack.co
2. Get your API keys from Dashboard → Settings → API Keys
3. Set up webhook for payment notifications
4. Configure webhook endpoint: `https://your-project-url.com/api/paystack/webhook`

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

PAYSTACK_PUBLIC_KEY=your_paystack_public_key
```

And for Firebase Functions (set in Firebase Console):

```env
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret
```

## 📦 Deployment

### Deploy to Firebase Hosting

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

### Production Considerations

1. **Security Rules**: Configure Firestore and Storage security rules
2. **Domain Setup**: Add custom domain in Firebase Hosting
3. **SSL Certificate**: Automatically handled by Firebase
4. **Environment Variables**: Set up in Firebase Console for Functions
5. **Monitoring**: Set up Firebase Performance Monitoring

## 🔑 API Endpoints

### Firebase Functions

- `getFundingRates`: Fetch current funding rates from exchanges
- `getZScoreOpportunities`: Get Z-score analysis opportunities
- `getHistoricalRates`: Get historical funding rate data
- `getUserProfile`: Get user profile and subscription info
- `handlePaystackWebhook`: Process Paystack webhooks

## 📊 Data Sources

The platform fetches data from multiple cryptocurrency exchanges:

- **Binance USDT-M Futures** (binanceusdm)
- **Bybit** (bybit)
- **OKX** (okx)
- **Gate.io** (gateio)

### Symbols Tracked

- BTC/USDT:USDT
- ETH/USDT:USDT
- SOL/USDT:USDT
- XRP/USDT:USDT
- DOGE/USDT:USDT
- AVAX/USDT:USDT
- DOT/USDT:USDT
- LINK/USDT:USDT
- MATIC/USDT:USDT
- ADA/USDT:USDT

## 🧮 Calculations

### APR Calculation
```
Daily Rate = Funding Rate × 3 (funding occurs 3x per day)
APR = Daily Rate × 365 × 100
```

### Z-Score Analysis
```
Z-Score = (Current Rate - Historical Mean) / Standard Deviation
```

- **Z-Score ≥ 3**: Very rare opportunity
- **Z-Score ≥ 2.5**: Rare opportunity
- **Z-Score ≥ 2**: Unusual
- **Z-Score < 2**: Normal

## 🔔 Notifications

### Email Notifications (Pro/Premium)
- High APR opportunities above user-defined threshold
- Z-score opportunities above significance threshold
- Subscription expiry reminders

### Push Notifications (Premium)
- Real-time alerts for significant opportunities
- Custom threshold notifications

## 📈 Performance Optimization

- **Caching**: Firebase Functions cache data for 10 minutes
- **Pagination**: Large datasets are paginated
- **Lazy Loading**: Components load on demand
- **Optimized Queries**: Firestore queries use indexes

## 🔒 Security

- **Authentication**: Firebase Auth with email/password and Google SSO
- **Authorization**: Role-based access control (Free/Pro/Premium)
- **Data Validation**: Input validation and sanitization
- **Rate Limiting**: API rate limiting to prevent abuse
- **HTTPS**: All connections use HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Risk Disclaimer

Trading cryptocurrency carries significant risk. The funding rate arbitrage strategy is market-neutral but still carries risks:

- **Exchange Risk**: Counterparty risk if exchanges are hacked or go bankrupt
- **Rate Flips**: Funding rates can change from positive to negative
- **Liquidation Risk**: High leverage can lead to liquidation
- **Price De-Peg**: Spot and futures prices can temporarily diverge

Always do your own research and trade responsibly.

## 📞 Support

For support:
- Email: support@ratearb.com
- Documentation: [Wiki](https://github.com/your-repo/wiki)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🔄 Updates

### v1.0.0
- Initial release
- Basic funding rate scanning
- Authentication system
- Subscription management

### Planned Features
- Mobile app (React Native)
- Advanced analytics dashboard
- Automated trading alerts
- Portfolio tracking
- More exchanges support