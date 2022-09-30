/* eslint-disable react-hooks/exhaustive-deps */
import { useFetchMarketCode, useUpbitWebSocket } from "use-upbit-api";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import styled from "@emotion/styled";
import RealTimeChart from "@/components/RealTimeChart";
import RealTimeOrderBook from "@/components/RealTimeOrderBook";
import {
  marketCodesState,
  selectedCoinInfoState,
  selectedCoinState,
} from "@/recoil/state";
import CoinInfo from "@/components/CoinInfo";
import CoinList from "@/components/CoinList";
import TradeForm from "@/components/TradeForm";

const Container = styled.div`
  display: grid;
  grid-template-columns: 5fr 2fr;
  column-gap: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 1rem;
  padding: 2rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 1rem;
`;
const TwoColumnWrapper = styled.div`
  display: grid;
  height: 30rem;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
`;

const SideBar = styled.div`
  position: sticky;
  top: 1rem;
  width: 100%;
  height: 45rem;
  box-sizing: border-box;
  padding: 1rem 0 1rem 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 1rem;
`;

function TradePage() {
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const [marketCodes, setMarketCodes] = useRecoilState(marketCodesState);
  const { marketCodes: targetMarketCodes } = useFetchMarketCode();
  const { socketData } = useUpbitWebSocket(marketCodes, "ticker", {
    throttle_time: 400,
    max_length_queue: 100,
  });
  const [, setSelectedCoinInfo] = useRecoilState(selectedCoinInfoState);

  useEffect(() => {
    if (socketData) {
      const targetData = socketData.filter(
        (data) => data.code === selectedCoin[0].market
      );
      setSelectedCoinInfo(...targetData);
    }
  }, [selectedCoin, socketData]);

  useEffect(() => {
    const MarketCodesKRW = targetMarketCodes.filter((code) =>
      code.market.includes("KRW")
    );
    setMarketCodes(MarketCodesKRW);
  }, [targetMarketCodes]);

  const handleCoinClick = (event) => {
    const currentTarget = marketCodes.filter(
      (code) => code.market === event.currentTarget.id
    );
    setSelectedCoin(currentTarget);
  };
  return (
    <Container>
      <Wrapper>
        <CoinInfo />
        <RealTimeChart />
        <TwoColumnWrapper>
          <RealTimeOrderBook style={{ height: "30rem" }} />
          <TradeForm />
        </TwoColumnWrapper>
      </Wrapper>
      <SideBar>
        <CoinList data={socketData} onClick={handleCoinClick} />
      </SideBar>
    </Container>
  );
}

export default TradePage;
