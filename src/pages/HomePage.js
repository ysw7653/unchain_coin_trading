import styled from "@emotion/styled";
import Banner from "@/components/Banner";
import TradingViewWidget from "@/components/TradingViewWidget";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function HomePage() {
  return (
    <Container>
      <Banner />
      <TradingViewWidget height="30rem" />
    </Container>
  );
}
export default HomePage;
