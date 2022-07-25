#https://search.naver.com/search.naver?where=news&sm=tab_pge&query=%EB%B9%84%ED%8A%B8%EC%BD%94%EC%9D%B8&sort=0&photo=0&field=0&pd=0&ds=&de=&cluster_rank=19&mynews=0&office_type=0&office_section_code=0&news_office_checked=&nso=so:r,p:all,a:all&start=" + str(num)

with open("./words/negative_words_self.txt", encoding='utf-8') as neg:
  negative = neg.readlines()

negative = [neg.replace("\n", "") for neg in negative]

with open("./words/positive_words_self.txt", encoding='utf-8') as pos:
  positive = pos.readlines()

negative = [neg.replace("\n", "") for neg in negative]
positive = [pos.replace("\n", "") for pos in positive]

import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
from tqdm import tqdm

labels = []
titles = []

j = 0


for k in tqdm(range(10)):
    num = k * 10 + 1
    keyword = "비트코인"
    url = "https://search.naver.com/search.naver?where=new&query="+keyword+"&start="+ str(num)
    
    req = requests.get(url)

    soup = BeautifulSoup(req.text, 'lxml')
    
    titles = soup.select("a._sp_each_title")
    
    for title in titles:
        title_data = title.text
        clean_title = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…\"\“》]', '', title_data) 
        negative_flag = False

        label = 0
        for i in range(len(negative)):
          if negative[i] in clean_title:
            label = -1
            negative_flag = True
            print("negative 비교단어 : ", negative[i], "clean_title : ", clean_title) 
            break
        if negative_flag == False:
          for i in range(len(positive)):
            if positive[i] in clean_title:
              label = 1
              print("positive 비교단어 : ", positive[i], "clean_title : ", clean_title)
              break
        titles.append(clean_title)
        labels.append(label)

my_title_df = pd.DataFrame({"title":titles, "label":labels})

def dftoCsv(my_title_df, num):
    my_title_df.to_csv(('./title_datas'+ str(num) +'.csv'), sep=',', na_rep='NaN', encoding='utf-8')

if __name__=="__main__":
    dftoCsv(my_title_df, num)