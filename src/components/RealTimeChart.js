/* eslint-disable react-hooks/exhaustive-deps */
import styled from "@emotion/styled";
import { createChart, CrosshairMode } from "lightweight-charts";
import { memo, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import dayjs from "dayjs";
import { selectedCoinInfoState, selectedCoinState } from "@/recoil/state";

const ChartContainer = styled.div`
  box-sizing: border-box;
  padding: 0.5rem;
  grid-column: 1 / span 2;
  width: 100%;
  height: 26rem;
  background-color: white;
  border: 1px solid whitesmoke;
`;

function ChartComponent({ processedData, updatedCandle }) {
  const chartContainerRef = useRef();
  const chart = useRef();
  const newSeries = useRef();
  useEffect(() => {
    if (!processedData) {
      return () => {};
    }
    const handleResize = () => {
      chart.current.applyOptions({
        width: chartContainerRef.current.clientWidth,
      });
    };
    chart.current = createChart(chartContainerRef.current, {
      layout: {
        fontSize: 14,
        fontFamily: "inherit",
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      leftPriceScale: {
        borderVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderVisible: false,
      },
      handleScale: { mouseWheel: false },
    });
    chart.current.timeScale().fitContent();
    newSeries.current = chart.current.addCandlestickSeries({
      upColor: "#D24F45",
      wickUpColor: "#D24F45",
      downColor: "#1261C4",
      wickDownColor: "#1261C4",
      borderVisible: false,
    });
    window.addEventListener("resize", handleResize);

    newSeries.current.setData(processedData);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.current.remove();
    };
  }, [processedData]);

  useEffect(() => {
    if (updatedCandle && newSeries.current) {
      newSeries.current.update(updatedCandle);
    }
  }, [updatedCandle]);

  return (
    <ChartContainer>
      <div ref={chartContainerRef} />
    </ChartContainer>
  );
}

function RealTimeChart() {
  const selectedCoin = useRecoilValue(selectedCoinState);
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  const [fetchedData, setFetchedData] = useState();
  const [processedData, setProcessedData] = useState();
  const [updatedCandle, setUpdatedCandle] = useState();

  const options = { method: "GET", headers: { Accept: "application/json" } };
  async function fetchDayCandle(marketCode, date, count) {
    try {
      const response = await fetch(
        `https://api.upbit.com/v1/candles/days?market=${marketCode}&to=${date}T09:00:00Z&count=${count}&convertingPriceUnit=KRW`,
        options
      );
      const result = await response.json();
      setFetchedData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!selectedCoin) return;
    fetchDayCandle(selectedCoin[0].market, dayjs().format("YYYY-MM-DD"), 200);
  }, [selectedCoin]);

  useEffect(() => {
    if (!fetchedData) return;
    const processed = [...fetchedData].reverse().map((data) => {
      return {
        time: data.candle_date_time_kst,
        open: data.opening_price,
        high: data.high_price,
        low: data.low_price,
        close: data.trade_price,
      };
    });
    setProcessedData(processed);
  }, [fetchedData]);

  useEffect(() => {
    if (!selectedCoinInfo) return;
    setUpdatedCandle({
      time: selectedCoinInfo.trade_date
        ? {
            day: selectedCoinInfo.trade_date.slice(6, 8),
            month: selectedCoinInfo.trade_date.slice(4, 6),
            year: selectedCoinInfo.trade_date.slice(0, 4),
          }
        : null,
      open: selectedCoinInfo.opening_price,
      high: selectedCoinInfo.high_price,
      low: selectedCoinInfo.low_price,
      close: selectedCoinInfo.trade_price,
    });
  }, [selectedCoinInfo]);

  return (
    <ChartComponent
      processedData={processedData}
      updatedCandle={updatedCandle}
    />
  );
}

export default memo(RealTimeChart);
