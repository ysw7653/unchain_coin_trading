import requests
from bs4 import BeautifulSoup

MAX = 100

for n in range(1, MAX, 10):
    #url = "https://search.naver.com/search.naver?where=news&query="+keyword+"&start="+str(n)

    raw = requests.get("https://search.naver.com/search.naver?where=news&query=비트코인&start="+str(n), headers={'User-Agent':'Mozilla/5.0'})

    html = BeautifulSoup(raw.text, "html.parser")

    articles = html.select("ul.type01 > li")

    for article in articles:
        title = article.select_one("a._sp_each_title").text
        source = article.select_one("span._sp_each_source").text

        print(title)