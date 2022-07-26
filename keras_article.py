import requests
from bs4 import BeautifulSoup

keyword = "비트코인"
pageNum = 1
for num in range(1, 50, 10):
  print(f"{pageNum}페이지입니다.----------------")
  response = requests.get(f"https://search.naver.com/search.naver?where=news&sm=tab_jum&query={keyword}&start={num}")
  html = response.text
  soup = BeautifulSoup(html, 'html.parser')
  links = soup.select(".news_tit")
  for link in links:
    title = link.text
    url = link.attrs['href']
    print(title, url, "\n")
  pageNum = pageNum + 1