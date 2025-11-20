To build something valuable in one week, you must strip away the "Execution" (auto-trading) and "Deep Learning" layers. These require months of security and infrastructure work.

Instead, build a Real-Time Arbitrage "Scanner" Dashboard.

The Value Proposition: Traders cannot watch 10 exchanges at once. Your tool acts as a "Market HUD" (Heads-Up Display) that highlights opportunities for them to execute manually or via their own simple scripts.

Here is your 7-Day "Scanner" MVP Plan.

The Tech Stack (Optimized for Speed)
Language: Python (The ecosystem is ready-made).

Library: ccxt (Unified API for hundreds of exchanges—saves you weeks of coding).

Frontend: Streamlit (Turns Python scripts into a web dashboard instantly. No HTML/CSS/JS needed).

"AI" Component: Z-Score (Standard Deviation) to flag "Abnormal Spreads" (Statistical Arbitrage).

The Architecture
Fetch: Pull "Order Book" data (Ask price from Ex A, Bid price from Ex B) for top 10 coins.

Calculate: Spread % = ((Bid_B - Ask_A) / Ask_A) \* 100.

Filter: Subtract estimated fees (approx 0.2%). If result > 0, it's an opportunity.

Display: Show a live table sorted by highest profit %.

7-Day Execution Roadmap
Day 1-2: The Engine (Data Fetching)
Install ccxt and connect to two liquid exchanges (e.g., Binance and Kraken). Write a script that fetches the BTC/USDT price from both simultaneously.

Goal: Print "Binance: $90,000 | Kraken: $90,050" in your terminal.

Day 3: The Logic (The Math)
Implement the arbitrage logic. You are looking for the lowest Ask (sell price) and the highest Bid (buy price).

Formula: Profit = (Bid_Exchange_2 - Ask_Exchange_1) - (Fees)

Goal: A list of dictionaries containing {Symbol, BuyAt, SellAt, NetProfit%}.

Day 4: The Interface (Streamlit)
Install streamlit. Map your data list to a DataFrame and display it. Add a "Refresh" button.

Goal: A web page running locally that updates prices when you click a button.

Day 5: The "Smart" Layer (Basic AI)
Add a Z-Score Analysis. This is your "Predictive/AI" differentiator.

Instead of just showing the spread, calculate the average spread over the last hour.

If the current spread is 2 Standard Deviations above the average, flag it as a "Rare Opportunity."

Value: This tells the user: "This isn't just a price difference; this is an unusually good price difference."

Day 6: Notifications
Add a simple Telegram or Discord webhook.

Logic: If NetProfit% > 1%, send a message to the user's phone.

Goal: The user doesn't have to stare at the screen.

Day 7: Deployment
Deploy to Streamlit Cloud (free and one-click integration with GitHub).

Goal: A public URL you can share.
