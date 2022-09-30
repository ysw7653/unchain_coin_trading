import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import fetchNews from "@/api/news";
import NewsBanner from "@/components/NewsBanner";
import Text from "@/components/Text";
import TrendGraph from "@/components/TrendGraph";
import BarGraph from "@/components/BarGraph";

const Container = styled.div`
  box-sizing: border-box;
  max-width: 1360px;
  margin: 0 auto;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 8fr 3fr;
  gap: 1.5rem;
`;

const IndicatorContainer = styled.div`
  display: flex;
  position: sticky;
  top: 2rem;
  height: 48rem;
  flex-direction: column;
  grid-row: span 2;
  gap: 0.5rem;
`;

const GraphContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  & > div {
    flex-grow: 1;
  }
`;
const NewsConainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0.5rem;
  gap: 0.3rem;
  min-width: 36rem;
  height: 36rem;
  overflow: auto;
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    width: 5px;
    border-radius: 13px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: #aaa;
  }
`;

const ImageWrapper = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 1px 10px 0px;
`;

const getColor = (value) => {
  if (value >= 75) return "green";
  if (value <= 25) return "red";
  return "orange";
};

const getKeyword = (value) => {
  if (value >= 75) return "과매수";
  if (value <= 25) return "과매도";
  return "중간";
};

function TrendsPage() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const updateNews = async () => {
      const {
        result: { data },
      } = await fetchNews();
      setNews(data);
    };
    updateNews();
  }, []);

  const data1 = [
<<<<<<< HEAD
    { opinion: "긍정", positiv: 14, positivColor: "green" },
    { opinion: "중립", neutral: 35, neutralColor: "orange" },
    { opinion: "부정", negative: 21, negativeColor: "red" },
  ];

  const data2 = [
    { opinion: "긍정", positiv: 12, positivColor: "green" },
    { opinion: "중립", neutral: 45, neutralColor: "orange" },
    { opinion: "부정", negative: 13, negativeColor: "red" },
=======
    { opinion: "긍정", positiv: 8, positivColor: "green" },
    { opinion: "중립", neutral: 33, neutralColor: "orange" },
    { opinion: "부정", negative: 29, negativeColor: "red" },
  ];

  const data2 = [
    { opinion: "긍정", positiv: 8, positivColor: "green" },
    { opinion: "중립", neutral: 33, neutralColor: "orange" },
    { opinion: "부정", negative: 29, negativeColor: "red" },
>>>>>>> 43e0adcc0ed7f33a6c31b477e234c06891fa8dd8
  ];

  return (
    <Container>
      <Text variant="h4" weight={600} gutterBottom>
        Trends
      </Text>
      <Content>
        <GraphContainer>
          <BarGraph data={data1} title="비트코인 여론" />
          <BarGraph data={data2} title="이더리움 여론" />
        </GraphContainer>
        <IndicatorContainer>
          <Text variant="h6" weight={600}>
            지표 그래프
          </Text>
          <TrendGraph
<<<<<<< HEAD
            value={50.54}
            title="강도 지수(RSI)"
            keyword={getKeyword(50.54)}
            color={getColor(50.54)}
          />
          <TrendGraph
            value={63.21}
            title="스토캐스틱"
            keyword={getKeyword(63.21)}
            color={getColor(63.21)}
=======
            value={76.52}
            title="강도 지수(RSI)"
            keyword={getKeyword(76.52)}
            color={getColor(76.52)}
          />
          <TrendGraph
            value={44.35}
            title="스토캐스틱"
            keyword={getKeyword(44.35)}
            color={getColor(44.35)}
>>>>>>> 43e0adcc0ed7f33a6c31b477e234c06891fa8dd8
          />
          <ImageWrapper>
            <img
              width="100%"
              src="https://alternative.me/crypto/fear-and-greed-index.png"
              alt="feer-and-greed-graph"
            />
          </ImageWrapper>
        </IndicatorContainer>
        <NewsConainer>
          <Text variant="h6" weight={600}>
            관련 뉴스
          </Text>
          <NewsWrapper>
            {news.map(
              ({
                title,
                sub_title: subTitle,
                pubdate,
                time_line: timeLine,
                id,
              }) => (
                <NewsBanner
                  key={id}
                  title={title}
                  subTitle={subTitle}
                  timeLine={timeLine}
                  date={pubdate}
                  height="7rem"
                />
              )
            )}
          </NewsWrapper>
        </NewsConainer>
      </Content>
    </Container>
  );
}

export default TrendsPage;
