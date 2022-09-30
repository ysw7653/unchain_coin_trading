/* eslint-disable react/no-array-index-key */
import { memo, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "@emotion/styled";
import { useUpbitWebSocket } from "use-upbit-api";
import { selectedCoinInfoState, selectedCoinState } from "@/recoil/state";
import Text from "./Text";

const Container = styled.div``;
const Header = styled.div`
  background-color: white;
  height: 35px;
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Body = styled.div`
  overflow: auto;
  height: calc(100% - 35px);
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

const AskContainer = styled.div`
  background-color: white;
`;

const AskBidSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
`;

const AskSection = styled(AskBidSection)`
  background-color: #cde5ff;
`;
const BidContainer = styled.div`
  background-color: white;
`;

const BidSection = styled(AskBidSection)`
  background-color: #ffcdcd;
`;

const OrderBox = styled.div`
  height: 30px;
  border: 1px solid white;
`;

const BlankBox = styled(OrderBox)`
  background-color: white;
`;

const OrderPriceBox = styled(OrderBox)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 12px;
  color: ${(props) => {
    switch (props.changeType) {
      case "RISE":
        return "#EF1C1C";
      case "EVEN":
        return "#000000";
      case "FALL":
        return "#1261C4";
      default:
        return "#000000";
    }
  }};
  div:nth-of-type(1) {
    font-weight: 600;
  }
`;
const OrderSizeBox = styled(OrderBox)`
  font-size: 11px;
`;

const AskOrderSizeBox = styled(OrderSizeBox)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BidOrderSizeBox = styled(OrderSizeBox)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SizeBarBox = styled.div`
  width: ${({ width }) => width};
  height: 70%;
  justify-content: ${({ type }) =>
    type === "right" ? "flex-end" : "flex-start"};
  display: flex;
  align-items: center;
`;
const AskSizeBarBox = styled(SizeBarBox)`
  background-color: #90bfff;
  div {
    padding-right: 5px;
  }
`;
const BidSizeBarBox = styled(SizeBarBox)`
  background-color: #ff9090;
  div {
    padding-left: 5px;
  }
`;

const getChangeRate = (currentValue, prevClose) => {
  const result = (((currentValue - prevClose) / prevClose) * 100).toFixed(2);
  return result;
};

const getChangeType = (currentValue, prevClose) => {
  const change = currentValue - prevClose;
  if (change > 0) {
    return "RISE";
  }
  if (change === 0) {
    return "EVEN";
  }
  if (change < 0) {
    return "FALL";
  }
  return "EVEN";
};

const getMaxSize = (orderbook) => {
  const askSizes = [];
  const bidSizes = [];
  orderbook.forEach((unit) => {
    askSizes.push(unit.ask_size);
    bidSizes.push(unit.bid_size);
  });
  const maxAskSize = Math.max(...askSizes);
  const maxBidSize = Math.max(...bidSizes);

  return [maxAskSize, maxBidSize];
};

function RealTimeOrderBook({ style }) {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socketData } = useUpbitWebSocket(
    selectedCoin,
    "orderbook",
    webSocketOptions
  );

  const [askMaxSize, setAskMaxSize] = useState();
  const [bidMaxSize, setBidMaxSize] = useState();

  const [scrollOn, setScrollOn] = useState(false);
  const orderBookContainerRef = useRef();

  useEffect(() => {
    if (socketData) {
      const orderbook = socketData.orderbook_units;
      const [maxAskSize, maxBidSize] = getMaxSize(orderbook);
      setAskMaxSize(maxAskSize);
      setBidMaxSize(maxBidSize);
      if (!scrollOn) {
        orderBookContainerRef.current.scrollTop =
          orderBookContainerRef.current.scrollHeight / 3;
      }
    }
  }, [socketData]);

  const scrollEventHandler = () => {
    setScrollOn(true);
  };
  return (
    <Container
      ref={orderBookContainerRef}
      onScroll={scrollEventHandler}
      style={style}
    >
      <Header>
        <Text variant="body2" weight={600}>
          매수량
        </Text>
        <Text variant="body2" weight={600}>
          가격
        </Text>
        <Text variant="body2" weight={600}>
          매도량
        </Text>
      </Header>
      <Body>
        {socketData && selectedCoinInfo ? (
          <>
            <AskContainer>
              {[...socketData.orderbook_units].reverse().map((data, index) => (
                <AskSection key={index}>
                  <AskOrderSizeBox>
                    <AskSizeBarBox
                      type="right"
                      width={`${(data.ask_size / askMaxSize) * 100}%`}
                    >
                      <Text variant="caption">{data.ask_size}</Text>
                    </AskSizeBarBox>
                  </AskOrderSizeBox>
                  <OrderPriceBox
                    changeType={getChangeType(
                      data.ask_price,
                      selectedCoinInfo.prev_closing_price
                    )}
                  >
                    <Text variant="subtitle2" weight={600}>
                      {data.ask_price.toLocaleString("ko-KR")}
                    </Text>
                    <Text variant="caption">
                      {getChangeRate(
                        data.ask_price,
                        selectedCoinInfo.prev_closing_price
                      ) > 0
                        ? "+"
                        : null}
                      {getChangeRate(
                        data.ask_price,
                        selectedCoinInfo.prev_closing_price
                      )}
                      %
                    </Text>
                  </OrderPriceBox>
                  <BlankBox />
                </AskSection>
              ))}
            </AskContainer>
            <BidContainer>
              {socketData.orderbook_units.map((data, index) => (
                <BidSection key={index}>
                  <BlankBox />
                  <OrderPriceBox
                    changeType={getChangeType(
                      data.bid_price,
                      selectedCoinInfo.prev_closing_price
                    )}
                  >
                    <Text variant="subtitle2" weight={600}>
                      {data.bid_price.toLocaleString("ko-KR")}
                    </Text>
                    <Text variant="caption">
                      {getChangeRate(
                        data.bid_price,
                        selectedCoinInfo.prev_closing_price
                      ) > 0
                        ? "+"
                        : null}
                      {getChangeRate(
                        data.bid_price,
                        selectedCoinInfo.prev_closing_price
                      )}
                      %
                    </Text>
                  </OrderPriceBox>
                  <BidOrderSizeBox>
                    <BidSizeBarBox
                      type="left"
                      width={`${(data.bid_size / bidMaxSize) * 100}%`}
                    >
                      <Text variant="caption">{data.bid_size}</Text>
                    </BidSizeBarBox>
                  </BidOrderSizeBox>
                </BidSection>
              ))}
            </BidContainer>
          </>
        ) : (
          "Loading..."
        )}
      </Body>
    </Container>
  );
}

export default memo(RealTimeOrderBook);
