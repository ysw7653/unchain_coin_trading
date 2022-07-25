import requests
import pandas 
import time
import webbrowser
import datetime
import pyupbit

def rsi(ohlc: pandas.DataFrame, period: int = 14):
    delta = ohlc["close"].diff()
    ups, downs = delta.copy(), delta.copy()
    ups[ups < 0] = 0
    downs[downs > 0] = 0
    AU = ups.ewm(com = period-1, min_periods = period).mean()
    AD = downs.abs().ewm(com = period-1, min_periods = period).mean()
    
    RS = AU/AD
    return pandas.Series(100 - (100/(1 + RS)), name = "RSI")  

while True:
    data = pyupbit.get_ohlcv(ticker="KRW-BTC", interval="minute60")
    now_rsi = rsi(data, 14).iloc[-1]
    print( now_rsi)
    time.sleep(10)
