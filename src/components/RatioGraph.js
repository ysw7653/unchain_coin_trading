import styled from "@emotion/styled";

const Graph = styled.div`
  position: relative;
  height: 0.5rem;
`;

const Bar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;
  background-color: #ccc;
  height: 0.5rem;
  width: 100%;
`;

const Stick = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ color }) => color};
  border-radius: 1rem;
  height: 0.5rem;
  width: ${({ rate }) => `${rate}%`};
`;

function RatioGraph({ rate, color = "red" }) {
  return (
    <Graph>
      <Bar />
      <Stick rate={rate} color={color} />
    </Graph>
  );
}

export default RatioGraph;
