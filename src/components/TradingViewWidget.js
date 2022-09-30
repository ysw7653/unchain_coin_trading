import { useEffect, useRef } from "react";

function TradingViewWidget({ width = "100%", height = "400px" }) {
  const container = useRef();
  useEffect(() => {
    let refValue;
    if (container.current && typeof TradingView !== "undefined") {
      // eslint-disable-next-line new-cap
      const newWidget = new TradingView.widget({
        symbol: "UPBIT:BTCKRW",
        interval: "1",
        timezone: "Etc/UTC",
        theme: "light",
        style: "0",
        locale: "kr",
        toolbar_bg: "#f1f3f6",
        enable_publishing: false,
        allow_symbol_change: true,
        details: true,
        show_popup_button: true,
        width,
        height,
        container_id: "tradingview_17997",
      });
      refValue = container.current;
    }

    return () => {
      if (refValue) {
        while (refValue.firstChild) {
          refValue.removeChild(refValue.firstChild);
        }
      }
    };
  }, [height, width]);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_17997" ref={container} />
    </div>
  );
}

export default TradingViewWidget;
