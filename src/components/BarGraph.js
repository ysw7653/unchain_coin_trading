import styled from "@emotion/styled";
import { ResponsiveBar } from "@nivo/bar";
import Text from "./Text";

const Container = styled.div`
  box-sizing: border-box;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 1px 10px 0px;
`;

function BarGraph({ title, data, height = "30rem" }) {
  return (
    <Container style={{ height }}>
      {title && (
        <Text variant="h5" weight={600}>
          {title}
        </Text>
      )}
      <ResponsiveBar
        data={data}
        keys={["positiv", "neutral", "negative"]}
        indexBy="opinion"
        margin={{ top: 30, right: 130, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={["lightgreen", "#FFFF99", "#FA8072"]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 5]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: title,
          legendPosition: "middle",
          legendOffset: 32,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
      />
    </Container>
  );
}

export default BarGraph;
