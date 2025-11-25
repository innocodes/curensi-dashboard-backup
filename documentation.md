Curensi.com Official Documentation

Welcome to the Curensi Master Playbook. This isn't just documentation; it is a blueprint for generating consistent, market-neutral yield using the same strategies employed by hedge funds.

Table of Contents

The Master Playbook: Understanding the Strategy

What is Funding Rate Arbitrage?

The "Golden Rules" of Curensi

Execution Guide: Your First "Cash & Carry" Trade

The Math: Costs vs. Profit

Step-by-Step Execution

Monitoring & Maintenance

Advanced Strategy: Cross-Exchange Arbitrage

The "Long-Short" Concept

Risks & Rewards

Risk Management: How Not to Lose Money

The 4 Deadly Risks

Mitigation Checklist

Optimization: Squeezing Every Dollar

The Compounding Loop

Fee Tier Hacking

1. The Master Playbook: Generating Passive Yield

What is "Funding Rate Arbitrage"?

In simple terms: You get paid to balance the market.

Cryptocurrency markets are divided into two worlds:

Spot Market: Buying actual coins (e.g., owning 1 BTC).

Futures Market: Betting on the price of coins (e.g., a Contract for 1 BTC).

These two prices should be identical, but they rarely are. When the market is bullish, everyone wants Futures contracts to get leverage. The price of Futures goes higher than Spot.

To fix this, exchanges force Futures buyers to pay a fee to Futures sellers every 8 hours. This fee is the Funding Rate.

The Strategy

We don't gamble on price. We take a Delta Neutral position:

Buy $10,000 of SOL (Spot Market).

Short $10,000 of SOL (Futures Market).

Result:

If SOL goes up 10%, your Spot makes $1,000, but your Short loses $1,000. Net Change: $0.

BUT: Because you are Shorting, you collect the Funding Rate fee every 8 hours.

This is how professionals generate 15% - 50% APR with minimal market risk.

The "Golden Rules" of Curensi

Before you execute your first trade, memorize these three rules.

Rule 1: Never Guess, Always Calculate

A high funding rate is useless if the entry price is bad.

Bad Trade: Earning $5 in fees but losing $20 on the entry spread.

Curensi Pro Solution: Our "Net Profit Calculator" instantly checks the Spot vs. Futures price spread to ensure you don't enter a losing trade.

Rule 2: Leverage Kills

This strategy is designed to be low-risk. Do not ruin it by using 10x leverage on your Short position.

Recommendation: Use 1x Leverage (or maximum 2x).

Why: If you use 10x leverage, a 10% price spike will liquidate your Short position, destroying your hedge.

Rule 3: Liquidity is King

Never chase a 200% APR on a coin with $50,000 trading volume. You will never be able to close the position without crashing the price.

Curensi Pro Filter: Our scanner automatically hides "Ghost Coins" with low liquidity to keep you safe.

2. Execution Guide: The "Cash & Carry" Trade

Objective: Execute a market-neutral arbitrage trade to capture funding fees while minimizing price exposure.

Part 1: The Math (Read This First)

Most beginners lose money because they ignore Entry Costs. You are not just earning yield; you are fighting fees.

Scenario: You have $10,000 USDT to deploy on Solana (SOL).

Funding Rate: 0.04% (per 8 hours).

Exchange: Bybit.

Stage

Action

Cost/Profit

Balance Impact

1. Entry

Buy $5,000 Spot + Short $5,000 Perp

-0.12% Fees

**-$12.00** (Loss)

2. Spread

Perp price was $0.50 lower than Spot

-0.05% Basis

**-$5.00** (Loss)

3. Day 1

Collect Funding (3x payments)

+0.12% Yield

+$12.00

4. Day 2

Collect Funding (3x payments)

+0.12% Yield

+$12.00

5. Exit

Close both positions

-0.12% Fees

-$12.00 (Loss)

The Verdict:

Days to Break Even: 2.5 Days.

Profit after 30 Days: $329.00 (Net).

APY: ~39.5% Risk-Free.

🚀 Curensi Pro Advantage: Don't do this math manually. Our "Net Profit Calculator" instantly factors in Taker Fees and Bid/Ask Spread to tell you exactly how many days you must hold to break even.

Part 2: Step-by-Step Execution

Step 1: Funding & Transfer

Deposit USDT (Tether) into your chosen exchange.

Bybit Users: Transfer funds to "Unified Trading Account".

Binance Users: Transfer 50% to "Fiat & Spot" and 50% to "USDⓈ-M Futures".

Step 2: The "Sync" Entry

Speed is critical. If you buy Spot and wait 1 minute to Short, the price might move 1%, leaving you unhedged.

Open Two Tabs: One for Spot (SOL/USDT), one for Futures (SOLUSDT Perpetual).

Prepare the Short (Futures Tab):

Margin Mode: Select "Isolated" (Safer) or "Cross" (Easier management).

Leverage: Set to 1x. Do not skip this.

Order Type: Market (for speed).

Size: 50% of your total capital.

Prepare the Long (Spot Tab):

Order Type: Market.

Size: The remaining 50% of your capital.

Execute: Click "Buy Spot" then immediately "Sell Short".

⚡ Curensi Whale Tier: Use our "Liquidity Monitor" to ensure there is enough volume on the order book to fill your $10,000 order without slippage.

Part 3: Monitoring & Maintenance

You are now live. You do not care if SOL goes to $500 or $5. You only care about the Funding Rate.

Green Rate: You get paid. Do nothing.

Red Rate (Negative): You PAY the fee.

Action: If the rate stays negative for >24 hours, close the trade.

💡 The "Rebalance" Trap

If SOL price doubles, your Spot position doubles in value, but your Short position is losing money and approaching liquidation.

Action: You must move USDT from your Spot wallet to your Futures wallet to lower your leverage back to 1x.

Auto-Alerts: Curensi sends you an SMS when your leverage hits 1.5x, so you never get liquidated while sleeping.

3. Advanced Strategy: Cross-Exchange Arbitrage

Warning: This strategy is for advanced users. It requires managing margin on two different exchanges.

The Concept

Standard "Cash & Carry" is done on one exchange.
Cross-Exchange Arb exploits the difference between exchanges.

Scenario:

Binance: Funding Rate is 0.01% (Normal).

Gate.io: Funding Rate is 0.15% (Extreme Spike).

The "Long-Short" Strategy

Instead of buying Spot (which costs fees and transfer time), we use Perps on both sides.

Long SOL-Perp on Binance (Low Funding Cost).

Short SOL-Perp on Gate.io (High Funding Payout).

The Math

Binance (Pay): You pay 0.01% every 8 hours.

Gate.io (Earn): You earn 0.15% every 8 hours.

Net Profit: 0.14% every 8 hours (~153% APR).

The Risks (Why you need Curensi Pro)

Liquidation Risk x2: You have two liquidation prices to watch. If SOL moons, your Gate.io short might get liquidated. If SOL dumps, your Binance Long might get liquidated.

Solution: Curensi Alerts warn you if price approaches your liquidation zone.

Rebalancing: You may need to move USDT from Binance to Gate.io to top up margin.

Solution: Curensi Dashboard monitors both funding rates in real-time so you know when to exit before the rates normalize.

Who is this for?

This strategy is capital efficient (you can use 2x or 3x leverage safely) but operationally complex. It is recommended for portfolios >$10,000.

4. Risk Management: The Bible

We build wealth by protecting capital first. Here are the 4 Deadly Risks and how to mitigate them.

Risk 1: The Liquidation Wick (The #1 Killer)

Although you are "hedged," your Futures position typically has a Liquidation Price.

Scenario: You Short SOL at $100. Liquidation is at $200.

Event: SOL pumps to $205 instantly. Your Short is wiped out. Your Spot position gained value, but you lost your hedge and your principal on the Futures side.

The Fix:

Use Isolated Margin (limit losses to the position only).

Use 1x Leverage. Most exchanges set liquidation at infinite or very high prices for 1x shorts.

Set Alerts: Use Curensi SMS alerts to wake you up if price moves 50% toward liquidation.

Risk 2: The "Negative Rate" Flip

Funding rates vary. A positive rate can turn negative during a crash.

Scenario: Market crashes. Everyone shorts. Funding rate becomes -0.05%.

Impact: Now Shorts pay Longs. You are bleeding money every 8 hours.

The Fix: Check Curensi daily. If the APR turns negative for more than 24 hours, close the trade.

Risk 3: Exchange Counterparty Risk

If the exchange goes bankrupt (like FTX), your "Market Neutral" strategy doesn't matter. Your money is gone.

The Fix:

Diversify. Don't put 100% of funds on one exchange.

Use Tier 1 Exchanges (Binance, OKX, Bybit) for large positions.

Use Tier 2 Exchanges (Gate, Bitget) only for smaller, high-yield plays.

Risk 4: USDT De-Peg Risk

Most arbs use USDT as collateral. If USDT drops to $0.90, your portfolio value drops.

The Fix: Consider "Coin-Margined" contracts (Inverse Perps) where you hold BTC as collateral, though this introduces different hedging math.

5. Optimization: Turning 30% into 50%

Amateurs take the yield and spend it. Professionals compound it.

1. The Compounding Loop

Funding fees are paid in USDT directly to your Futures wallet. If you leave them there, they earn nothing.

The Strategy:
Every Friday (or whenever fees > $50):

Take your earned USDT fees.

Buy more Spot coin.

Short more Futures contracts.

The Math:

$10,000 at 40% APR (Simple Interest) = **$14,000** after 1 year.

$10,000 at 40% APR (Weekly Compounding) = **$14,918** after 1 year.

Difference: You made an extra ~$1,000 just by clicking buttons once a week.

🐳 Whale Tier Feature: The Curensi "Compound Calculator" tells you the exact date and amount to re-invest to maximize gas fees vs. yield.

2. The "Spread Hunter" Entry

Instead of entering instantly, use Limit Orders to capture the "Spread."

Taker Fee: 0.05% (You pay this).

Maker Fee: 0.02% (You pay less).

Strategy: Place a Limit Buy for Spot at the "Bid" price. Place a Limit Short for Futures at the "Ask" price.

Result: You save ~0.06% on entry and exit. That's 3 days of free yield.

3. Fee Tier Hacking

Binance: Hold some BNB to pay fees (-25% discount).

Bybit: Upgrade to VIP 1 by moving volume.

Impact: Reducing fees from 0.05% to 0.03% increases your net profit by ~15% on short-duration trades.

4. Hunting "Inefficiencies" with Curensi Pro

The best rates are often found on:

New Listings: Coins listed in the last 7 days often have wild funding rates.

Hated Coins: Coins with bad news often have massive negative funding (great for Long-Arb strategies).

Meme Coins: DOGE, SHIB, and PEPE often sustain 100%+ APRs for weeks during bull runs.

Use the Curensi "New Listing" filter to spot these before the crowd.
