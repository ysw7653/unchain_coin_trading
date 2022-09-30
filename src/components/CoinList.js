import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { marketCodesState, selectedCoinState } from "@/recoil/state";
import Text from "./Text";

const CoinBoxHeader = styled.div`
  background-color: white;
  opacity: 0.8;
  height: 35px;
  display: grid;
  grid-template-columns: 16fr 10fr 10fr 13fr;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const CoinBoxBody = styled.div`
  height: 95%;
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
const CoinBox = styled.div`
  height: 4rem;
  display: grid;
  grid-template-columns: 16fr 10fr 10fr 13fr;
  align-items: center;
  border-bottom: 0.5px solid lightgrey;
  padding: 0 0.5rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#eee" : "inherit")};
  &:hover {
    background-color: #eee;
  }
  & > div {
    display: flex;
  }
  & > div:nth-of-type(1) {
    flex-direction: column;
  }
  & > div:nth-of-type(2) {
    justify-self: end;
  }
  & > div:nth-of-type(3) {
    flex-direction: column;
    align-items: end;
    justify-self: end;
  }
  & > div:nth-of-type(4) {
    justify-self: end;
  }
`;
const priceColor = (type) => {
  switch (type) {
    case "RISE":
      return "#EF1C1C";
    case "EVEN":
      return "#000000";
    case "FALL":
      return "#1261C4";
    default:
      return "#000000";
  }
};
const convertMillonWon = (value) => {
  const MILLION = 1000000;
  const extractedValue = value / MILLION;
  return extractedValue;
};

function CoinList({ data, onClick }) {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const marketCodes = useRecoilValue(marketCodesState);
  return (
    <>
      <CoinBoxHeader>
        <Text variant="body2" weight={600}>
          코인
        </Text>
        <Text variant="body2" weight={600}>
          현재가
        </Text>
        <Text variant="body2" weight={600}>
          전일대비
        </Text>
        <Text variant="body2" weight={600}>
          거래대금
        </Text>
      </CoinBoxHeader>
      <CoinBoxBody>
        {data
          ? data.map((coin) => (
              <CoinBox
                key={coin.code}
                id={coin.code}
                onClick={onClick}
                selected={selectedCoin[0].market === coin.code}
              >
                <div>
                  <Text variant="subtitle2" weight={600}>
                    {
                      marketCodes.filter((code) => code.market === coin.code)[0]
                        .korean_name
                    }
                  </Text>
                  <Text variant="caption" weight={400} color="gray">
                    {
                      marketCodes.filter((code) => code.market === coin.code)[0]
                        .market
                    }
                  </Text>
                </div>
                <Text
                  variant="subtitle2"
                  weight={600}
                  color={priceColor(coin.change)}
                >
                  {coin.trade_price.toLocaleString("ko-KR")}
                </Text>
                <div>
                  <Text
                    variant="subtitle2"
                    weight={600}
                    color={priceColor(coin.change)}
                  >
                    {coin.signed_change_rate > 0 ? "+" : null}
                    {(coin.signed_change_rate * 100).toFixed(2)}%
                  </Text>
                  <Text variant="caption" color={priceColor(coin.change)}>
                    {coin.signed_change_price.toLocaleString("ko-KR")}
                  </Text>
                </div>
                <div>
                  <Text variant="caption" weight={600} noWrap>
                    {Math.ceil(
                      convertMillonWon(coin.acc_trade_price_24h)
                    ).toLocaleString("ko-KR")}
                  </Text>
                  <Text variant="caption" weight={600} color="gray" noWrap>
                    백만
                  </Text>
                </div>
              </CoinBox>
            ))
          : null}
      </CoinBoxBody>
    </>
  );
}

export default CoinList;
