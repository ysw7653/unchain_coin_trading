import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
from tqdm import tqdm
import matplotlib.pyplot as plt
import time

def dftoCsv(my_title_df, num):
    my_title_df.to_csv(('./article_datas/data'+f"_{keyword}_{now_time}"+'.csv'), sep=',', na_rep='NaN', encoding='utf-8')

    
now_time = time.strftime('%Y-%m-%d', time.localtime(time.time()))

#비트코인-----------------------------------------------------------------------------
bit_titles = []
bit_urls = []
keyword = "비트코인"
#pageNum = 1
for num in range(1, 70, 10):
  #print(f"{pageNum}페이지입니다.----------------")
  # pd 4 = 1일, pd 1 = 일주일
  response = requests.get(f"https://search.naver.com/search.naver?where=news&sm=tab_jum&query={keyword}&pd=4&start={num}")
  
  html = response.text
  soup = BeautifulSoup(html, 'html.parser')
  links = soup.select(".news_tit")
  for link in links:
    title = link.text
    url = link.attrs['href']
    clean_title = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ·!』\\‘|\(\)\[\]\<\>`\'…\"\“”》]', '', title) 
    #print(clean_title,"\n", url, "\n")
    bit_titles.append(clean_title)
    bit_urls.append(url)
  #pageNum = pageNum + 1

positive = []
negative = []
bit_labels = []
    
with open("./words/negative_words_self.txt", encoding='utf-8') as neg:
  negative = neg.readlines()

negative = [neg.replace("\n", "") for neg in negative]

with open("./words/positive_words_self.txt", encoding='utf-8') as pos:
  positive = pos.readlines()

negative = [neg.replace("\n", "") for neg in negative]
positive = [pos.replace("\n", "") for pos in positive]

label = [0] * 4000

bit_title_dic = {"title":[], "label":label}

for title in tqdm(range(len(bit_titles))):
  negative_flag = False
  neutrality_flag = True
  
  label = 0
  for i in range(len(negative)):
    if negative[i] in bit_titles[title]:
      label = label-1
      negative_flag = True
      neutrality_flag = False
    
  for i in range(len(positive)):
    if positive[i] in bit_titles[title]:
      label = label + 1
      neutrality_flag = False
      negative_flag = False

  if (label==0):
    bit_labels.append(0)
  elif label < 0:
    label = -1
    bit_labels.append(label)
  elif label > 0:
    bit_labels.append(1)

bit_title_df = pd.DataFrame({"title":bit_titles, "url":bit_urls, "label":bit_labels})
dftoCsv(bit_title_df, num)

#비트코인 끝--------------------------------------------------------------------------

#이더리움-----------------------------------------------------------------------------
eth_titles = []
eth_urls = []
keyword = "이더리움"
#pageNum = 1
for num in range(1, 70, 10):
  #print(f"{pageNum}페이지입니다.----------------")
  # pd 4 = 1일, pd 1 = 일주일
  response = requests.get(f"https://search.naver.com/search.naver?where=news&sm=tab_jum&query={keyword}&pd=4&start={num}")
  
  html = response.text
  soup = BeautifulSoup(html, 'html.parser')
  links = soup.select(".news_tit")
  for link in links:
    title = link.text
    url = link.attrs['href']
    clean_title = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ·!』\\‘|\(\)\[\]\<\>`\'…\"\“”》]', '', title) 
    #print(clean_title,"\n", url, "\n")
    eth_titles.append(clean_title)
    eth_urls.append(url)
  #pageNum = pageNum + 1

eth_labels = []

label = [0] * 4000

eth_title_dic = {"title":[], "label":label}

for title in tqdm(range(len(eth_titles))):
  negative_flag = False
  neutrality_flag = True
  
  label = 0
  for i in range(len(negative)):
    if negative[i] in eth_titles[title]:
      label = label-1
      negative_flag = True
      neutrality_flag = False
    
  for i in range(len(positive)):
    if positive[i] in eth_titles[title]:
      label = label + 1
      neutrality_flag = False
      negative_flag = False

  if (label==0):
    eth_labels.append(0)
  elif label < 0:
    label = -1
    eth_labels.append(label)
  elif label > 0:
    eth_labels.append(1)

eth_title_df = pd.DataFrame({"title":eth_titles, "url":eth_urls, "label":eth_labels})

dftoCsv(eth_title_df, num)
#이더리움 끝--------------------------------------------------------------------------

"""
#리플코인-----------------------------------------------------------------------------
rip_titles = []
rip_urls = []
keyword = "리플코인"
#pageNum = 1
for num in range(1, 70, 10):
  #print(f"{pageNum}페이지입니다.----------------")
  # pd 4 = 1일, pd 1 = 일주일
  response = requests.get(f"https://search.naver.com/search.naver?where=news&sm=tab_jum&query={keyword}&pd=4&start={num}")
  
  html = response.text
  soup = BeautifulSoup(html, 'html.parser')
  links = soup.select(".news_tit")
  for link in links:
    title = link.text
    url = link.attrs['href']
    clean_title = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ·!』\\‘|\(\)\[\]\<\>`\'…\"\“”》]', '', title) 
    #print(clean_title,"\n", url, "\n")
    rip_titles.append(clean_title)
    rip_urls.append(url)
  #pageNum = pageNum + 1

positive = []
negative = []
rip_labels = []

label = [0] * 4000

rip_title_dic = {"title":[], "label":label}

for title in tqdm(range(len(rip_titles))):
  negative_flag = False
  neutrality_flag = True
  
  label = 0
  for i in range(len(negative)):
    if negative[i] in rip_titles[title]:
      label = label-1
      negative_flag = True
      neutrality_flag = False
    
  for i in range(len(positive)):
    if positive[i] in rip_titles[title]:
      label = label + 1
      neutrality_flag = False
      negative_flag = False

  if (label==0):
    rip_labels.append(0)
  elif label < 0:
    label = -1
    rip_labels.append(label)
  elif label > 0:
    rip_labels.append(1)

rip_title_df = pd.DataFrame({"title":rip_titles, "url":rip_urls, "label":rip_labels})
#리플코인 끝--------------------------------------------------------------------------
"""

if __name__ == "__main__":

    bit_data = pd.read_csv(f'./article_datas/data_비트코인_{now_time}.csv')
    bit_data['label'].value_counts().plot(kind='bar')
    plt.savefig(f'./article_datas/graph/비트코인_{now_time}.png')

    eth_data = pd.read_csv(f'./article_datas/data_이더리움_{now_time}.csv')
    eth_data['label'].value_counts().plot(kind='bar')
    plt.savefig(f'./article_datas/graph/이더리움_{now_time}.png')
    
    #dftoCsv(rip_title_df, num)

"""
    rip_data = pd.read_csv("./article_datas/data_리플코인.csv")
    rip_data['label'].value_counts().plot(kind='bar')
    plt.show()
  """