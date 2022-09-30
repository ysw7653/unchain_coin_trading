import pyupbit
def tickers_db(ticker):
    df = pyupbit.get_ohlcv(ticker, interval='minute60', count=120)
    return df
def get_stochastic_fast_k(close_price, low, high, n):
    fast_k = ((close_price - low.rolling(n).min()) / (high.rolling(n).max() - low.rolling(n).min())) * 100
    return fast_k

# Slow %K = Fast %K의 m기간 이동평균(SMA)
def get_stochastic_slow_k(fast_k, n):
    slow_k = fast_k.rolling(n).mean()
    return slow_k

try:
    # 조회 원하는 코인 데이터 베이스 생성 ex) KRW-BTC, KRW-ADA 등
    df = tickers_db('KRW-BTC')        
    # 기간 20 fast_k 획득
    df['fast_k'] = get_stochastic_fast_k(df['close'], df['low'], df['high'], 20)
    # 기간 5 slow_k 획득
    df['slow_k'] = get_stochastic_slow_k(df['fast_k'], 5)
    # 출력
    print(df)

except KeyboardInterrupt:
        print('시세조회 초과')