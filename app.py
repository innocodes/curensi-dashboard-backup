import streamlit as st
import pandas as pd
import ccxt
import time

# --- CONFIGURATION ---
# We will check the USDT-Margined Futures on these exchanges.
# 'binanceusdm' is the specific one for Binance USDT futures.
EXCHANGES = {
    'binanceusdm': 'Binance',
    'bybit': 'Bybit',
    'okx': 'OKX',
    'gateio': 'Gate.io'
}

# --- CORE LOGIC ---

@st.cache_data(ttl=600) # Cache data for 10 minutes to avoid hitting rate limits
def fetch_funding_data():
    """
    Fetches funding rate data from all specified exchanges and
    calculates the Annualized Percentage Rate (APR).
    """
    all_rates = []

    # Popular perpetual symbols to check
    symbols_to_check = [
        'BTC/USDT:USDT',
        'ETH/USDT:USDT',
        'SOL/USDT:USDT',
        'XRP/USDT:USDT',
        'DOGE/USDT:USDT',
        'AVAX/USDT:USDT',
        'DOT/USDT:USDT',
        'LINK/USDT:USDT',
        'MATIC/USDT:USDT',
        'ADA/USDT:USDT'
    ]

    for ex_id, ex_name in EXCHANGES.items():
        try:
            # Initialize the exchange
            exchange = getattr(ccxt, ex_id)()

            # Load markets to filter for perpetual swaps
            exchange.load_markets()

            for symbol in symbols_to_check:
                try:
                    # Use fetch_funding_rate which actually returns funding rates
                    funding_data = exchange.fetch_funding_rate(symbol)

                    if funding_data and 'fundingRate' in funding_data and funding_data['fundingRate'] is not None:
                        rate = funding_data['fundingRate']

                        # --- The "World-Class" Math ---
                        # Funding rates are *usually* for 8 hours (3x per day)
                        # APR = (Rate * Payments_Per_Day) * Days_Per_Year * 100
                        daily_rate = rate * 3
                        apr = (daily_rate * 365) * 100

                        all_rates.append({
                            'Exchange': ex_name,
                            'Symbol': symbol.replace('/USDT:USDT', ''), # Clean up symbol
                            'Funding Rate (8h)': round(rate * 100, 4),
                            'Est. APR %': round(apr, 2)
                        })

                except Exception:
                    # If a symbol doesn't exist or fails, just skip it
                    continue

        except Exception as e:
            # If one exchange fails, continue with others
            continue

    if not all_rates:
        return pd.DataFrame()

    df = pd.DataFrame(all_rates)
    df = df.sort_values(by='Est. APR %', ascending=False)
    df = df.reset_index(drop=True)  # Remove the index column
    return df

def style_apr(val):
    """
    Applies color to the APR column.
    Green for positive (you earn), Red for negative (you pay).
    """
    if val > 10:
        color = 'lightgreen'
    elif val > 0:
        color = 'white'
    elif val < -10:
        color = 'salmon'
    else:
        color = 'lightcoral'
    return f'color: {color}; font-weight: bold;'

# --- STREAMLIT UI ---

# 1. Page Configuration
st.set_page_config(
    page_title="Cash & Carry Scanner",
    page_icon="💰",
    layout="wide"
)

# 2. Title and Subheader
st.title("💰 Cash & Carry (Funding Rate) Scanner")
st.markdown("""
This tool scans crypto exchanges for the highest "Cash & Carry" yields.
This is a **market-neutral** strategy where you collect funding fees.
""")

# 3. Scan Button
if st.button("Scan Top Exchanges Now"):
    with st.spinner('Fetching live rates from Binance, Bybit, OKX...'):
        start_time = time.time()
        df = fetch_funding_data()
        end_time = time.time()
        
        if df.empty:
            st.error("Could not fetch data from any exchange. Are they down?")
        else:
            st.success(f"Scan complete in {end_time - start_time:.2f} seconds.")
            
            # Display Metrics
            top_opp = df.iloc[0]
            col1, col2, col3 = st.columns(3)
            col1.metric("Highest APR", f"{top_opp['Est. APR %']:.2f}%", f"{top_opp['Symbol']} on {top_opp['Exchange']}")
            col2.metric("Positive Yields", len(df[df['Est. APR %'] > 0]))
            col3.metric("Negative Yields", len(df[df['Est. APR %'] < 0]))
            
            # Display the main data table
            st.subheader("Live Funding Rate Opportunities")
            st.dataframe(
                df.style.applymap(style_apr, subset=['Est. APR %'])
                  .format({'Est. APR %': '{:.2f}%', 'Funding Rate (8h)': '{:.4f}%'}),
                use_container_width=True,
                height=600
            )

# 4. "How to Play" Guide (This adds immense user value)
st.subheader("How to Execute This Trade (The 'Cash & Carry')")
st.info("""
**Goal:** Collect the "Est. APR %" as a passive yield, regardless of whether the coin price goes up or down.

1.  **Find a High, Positive APR:** Look for a coin with a stable, high APR (e.g., `+35%`).
2.  **Go to that Exchange** (e.g., Binance).
3.  **Perform Two Trades Simultaneously:**
    * **BUY (Long):** Buy **\$1,000** of the coin on the **SPOT** market (e.g., Buy 100 `COIN`).
    * **SELL (Short):** Short **\$1,000** of the same coin on the **PERPETUAL FUTURES** market (e.g., Short 100 `COIN`).
4.  **Done.** You are now "Delta Neutral." Your Spot long and Futures short cancel each other out. You don't care about price. You will simply be paid the funding fee every 8 hours.

**Warning:** If the APR is **Negative** (Red), this trade is reversed. Shorts pay Longs. You would *lose* money.
""")

# 5. "The Risks" Section (This builds trust)
st.warning("""
**This is "Market-Neutral", not "Risk-Free". Understand the Risks:**

* **Rate Flips:** Funding rates can change from positive to negative. If a rate turns very negative, you will start *paying* the fee. You must monitor your positions.
* **Exchange Risk:** If the exchange gets hacked or goes bankrupt, your funds are at risk. This is not DeFi.
* **Liquidation Risk:** Only use **1x leverage** on your short. If you use high leverage, a sudden price spike can liquidate your short position, even if your spot position is safe, destroying the trade.
* **Price De-Peg:** The Spot price and Futures price can drift apart (called "Basis"). This can cause your combined position to show a temporary loss.
""")