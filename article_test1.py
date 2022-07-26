import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
from tqdm import tqdm

titles = []
urls = []

keyword = "비트코인"
#pageNum = 1
for num in range(1, 400, 10):
  #print(f"{pageNum}페이지입니다.----------------")
  response = requests.get(f"https://search.naver.com/search.naver?where=news&sm=tab_jum&query={keyword}&start={num}")
  html = response.text
  soup = BeautifulSoup(html, 'html.parser')
  links = soup.select(".news_tit")
  for link in links:
    title = link.text
    url = link.attrs['href']
    clean_title = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ·!』\\‘|\(\)\[\]\<\>`\'…\"\“”》]', '', title) 
    #print(clean_title,"\n", url, "\n")
    titles.append(clean_title)
    urls.append(url)
  #pageNum = pageNum + 1

positive = []
negative = []
labels = []
    
with open("./words/negative_words_self.txt", encoding='utf-8') as neg:
  negative = neg.readlines()

negative = [neg.replace("\n", "") for neg in negative]

with open("./words/positive_words_self.txt", encoding='utf-8') as pos:
  positive = pos.readlines()

negative = [neg.replace("\n", "") for neg in negative]
positive = [pos.replace("\n", "") for pos in positive]

label = [0] * 4000

my_title_dic = {"title":[], "label":label}

for title in tqdm(range(len(titles))):
  negative_flag = False
  neutrality_flag = True
  
  label = 0
  for i in range(len(negative)):
    if negative[i] in titles[title]:
      label = label-1
      negative_flag = True
      neutrality_flag = False
      print("1점 감점")
    
  for i in range(len(positive)):
    if positive[i] in titles[title]:
      label = label + 1
      neutrality_flag = False
      negative_flag = False
      print("1점 득점")

  if (label==0):
    labels.append(label)
    #labels.append(0)
  elif label < 0:
    labels.append(label)
    #labels.append(-l)
  elif label > 0:
    labels.append(label)
    #labels.append(1)

print(len(labels))

my_title_df = pd.DataFrame({"title":titles, "url":urls, "label":labels})

def dftoCsv(my_title_df, num):
    my_title_df.to_csv(('./article_datas/data'+str(num)+'.csv'), sep=',', na_rep='NaN', encoding='utf-8')

if __name__ == "__main__":
    dftoCsv(my_title_df, num)
