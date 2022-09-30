import pandas 
import time
import pyupbit

def rsi_func(ohlc: pandas.DataFrame, period: int = 14):
    delta = ohlc["close"].diff()
    ups, downs = delta.copy(), delta.copy()
    ups[ups < 0] = 0
    downs[downs > 0] = 0
    AU = ups.ewm(com = period-1, min_periods = period).mean()
    AD = downs.abs().ewm(com = period-1, min_periods = period).mean()
    
    RS = AU/AD
    return pandas.Series(100 - (100/(1 + RS)), name = "RSI")  
    
if __name__ == "__main__":
    data = pyupbit.get_ohlcv(ticker="KRW-BTC", interval="minute60")
    now_rsi = rsi_func(data, 14).iloc[-1]
    print("now rsi value is : ",now_rsi)
