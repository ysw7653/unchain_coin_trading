import styled from "@emotion/styled";
import RatioGraph from "./RatioGraph";
import Text from "./Text";

const Container = styled.div`
  box-sizing: border-box;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 1px 10px 0px;
`;
function TrendGraph({ title, keyword, description, value, color }) {
  return (
    <Container>
      <Text variant="subtitle1" weight={600}>
        {title}
      </Text>
      <Text variant="subtitle2" weight={600}>
        {value}, {keyword}
      </Text>
      <RatioGraph rate={value} color={color} />
    </Container>
  );
}

export default TrendGraph;
