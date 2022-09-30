import styled from "@emotion/styled";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { Divider } from "@mui/material";
import { selectedCoinInfoState, selectedCoinState } from "@/recoil/state";
import Text from "./Text";

const NameInfoContainer = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 1rem 0;
`;
const TradeLogo = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
`;
const TradeInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 15rem 1fr;
`;
const TradePriceInfoArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.5rem;
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
`;
const TradePriceInfoBox = styled.div`
  grid-column: 1 / span 2;
  display: flex;
  align-items: baseline;
  gap: 2px;
`;
const ChangeRateInfoBox = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2px;
`;
const PriceInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr;
  grid-template-rows: 1fr 5px 1fr;
  column-gap: 1rem;
  align-items: center;
  padding: 0.5rem;
`;
const PriceLogInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
const PriceWithUnit = styled.div`
  display: flex;
  gap: 2px;
  align-items: baseline;
`;

function CoinInfo() {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  return (
    <>
      <NameInfoContainer>
        {selectedCoinInfo.code && (
          <TradeLogo
            src={`https://static.upbit.com/logos/${selectedCoinInfo.code.substring(
              4
            )}.png`}
          />
        )}
        <Text variant="h4" weight={700}>
          {selectedCoin ? selectedCoin[0].korean_name : null}
        </Text>
        <Text variant="subtitle1" color="#888" weight={700}>
          {selectedCoinInfo ? selectedCoinInfo.code : null}
        </Text>
      </NameInfoContainer>
      <Divider variant="middle" />
      {selectedCoinInfo ? (
        <TradeInfoContainer>
          <TradePriceInfoArea changeType={selectedCoinInfo.change}>
            <TradePriceInfoBox>
              <Text variant="h4">
                {selectedCoinInfo.trade_price
                  ? selectedCoinInfo.trade_price.toLocaleString("ko-KR")
                  : null}
              </Text>
              <Text variant="subtitle1">KRW</Text>
            </TradePriceInfoBox>
            <ChangeRateInfoBox>
              <Text variant="subtitle2" color="gray" weight={600}>
                전일대비
              </Text>
              <Text variant="subtitle2" weight={600}>
                {selectedCoinInfo.signed_change_rate > 0 ? "+" : null}
                {(selectedCoinInfo.signed_change_rate * 100).toFixed(2)}%
              </Text>
            </ChangeRateInfoBox>
            <Text variant="subtitle2" weight={600}>
              {selectedCoinInfo.signed_change_price > 0 ? "▲" : "▼"}
              {selectedCoinInfo.change_price
                ? selectedCoinInfo.change_price.toLocaleString("ko-KR")
                : null}
            </Text>
          </TradePriceInfoArea>
          <PriceInfoContainer>
            <PriceLogInfoBox>
              <Text variant="subtitle2" weight={600}>
                고가
              </Text>
              <Text color="#ef1c1c" weight={600}>
                {selectedCoinInfo.high_price
                  ? selectedCoinInfo.high_price.toLocaleString("ko-KR")
                  : null}
              </Text>
            </PriceLogInfoBox>
            <PriceLogInfoBox>
              <Text variant="subtitle2" weight={600}>
                52주 고가
              </Text>
              <Text color="#ef1c1c" weight={600}>
                {selectedCoinInfo.highest_52_week_price
                  ? selectedCoinInfo.highest_52_week_price.toLocaleString(
                      "ko-KR"
                    )
                  : null}
              </Text>
            </PriceLogInfoBox>
            <PriceLogInfoBox>
              <Text variant="subtitle2" weight={600}>
                거래량(24H)
              </Text>
              <PriceWithUnit>
                <Text weight={600}>
                  {selectedCoinInfo.acc_trade_volume_24h
                    ? selectedCoinInfo.acc_trade_volume_24h.toLocaleString(
                        "ko-KR"
                      )
                    : null}
                </Text>
                <Text variant="caption" color="gray">
                  BTC
                </Text>
              </PriceWithUnit>
            </PriceLogInfoBox>
            <Divider />
            <Divider />
            <Divider />
            <PriceLogInfoBox>
              <Text variant="subtitle2" weight={600}>
                저가
              </Text>
              <Text color="#1261c4" weight={600}>
                {selectedCoinInfo.low_price
                  ? selectedCoinInfo.low_price.toLocaleString("ko-KR")
                  : null}
              </Text>
            </PriceLogInfoBox>
            <PriceLogInfoBox>
              <Text variant="subtitle2" weight={600}>
                52주 저가
              </Text>
              <Text color="#1261c4" weight={600}>
                {selectedCoinInfo.lowest_52_week_price
                  ? selectedCoinInfo.lowest_52_week_price.toLocaleString(
                      "ko-KR"
                    )
                  : null}
              </Text>
            </PriceLogInfoBox>
            <PriceLogInfoBox>
              <Text variant="subtitle2" weight={600}>
                거래대금(24H)
              </Text>
              <PriceWithUnit>
                <Text weight={600}>
                  {selectedCoinInfo.acc_trade_price_24h
                    ? Math.ceil(
                        selectedCoinInfo.acc_trade_price_24h
                      ).toLocaleString("ko-KR")
                    : null}
                </Text>
                <Text variant="caption" color="gray">
                  KRW
                </Text>
              </PriceWithUnit>
            </PriceLogInfoBox>
          </PriceInfoContainer>
        </TradeInfoContainer>
      ) : (
        "Loading..."
      )}
    </>
  );
}

export default memo(CoinInfo);
