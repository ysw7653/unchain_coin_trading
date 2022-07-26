import codecs
import requests
from bs4 import BeautifulSoup
import re
import pandas as pd

positive = []
negative = []
    
with open("./words/negative_words_self.txt", encoding='utf-8') as neg:
  negative = neg.readlines()

negative = [neg.replace("\n", "") for neg in negative]

with open("./words/positive_words_self.txt", encoding='utf-8') as pos:
  positive = pos.readlines()

negative = [neg.replace("\n", "") for neg in negative]
positive = [pos.replace("\n", "") for pos in positive]

label = [0] * 4000

my_title_dic = {"title":[], "label":label}

import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
from tqdm import tqdm

labels = []
titles = []

j = 0

for k in tqdm(range(20)):
    num = k * 10 + 1

    req = requests.get(f"https://search.naver.com/search.naver?&where=news&query=%EB%B2%84%EA%B1%B0%ED%82%B9&sm=tab_pge&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so:r,p:all,a:all&mynews=0&cluster_rank=23&start={num}")
    
    soup = BeautifulSoup(req.text, 'lxml')
    
    titles = soup.select("a._sp_each_title")
    print(titles)
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

if __name__ == "__main__":
  dftoCsv(my_title_df, num)