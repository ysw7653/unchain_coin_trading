import styled from "@emotion/styled";
import bannerImg from "@/assets/title.jpg";
import Text from "./Text";

const Container = styled.div`
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: 3rem 0;
  align-items: center;
  justify-content: center;
`;
const BackgroundImg = styled.img`
  width: 90%;
  height: 27rem;
  border-radius: 1rem;
  object-fit: cover;
`;
const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 10rem;
  width: 20rem;
  top: calc(50% - 5rem);
  right: calc(50% - 10rem);
`;

function Banner() {
  return (
    <Container>
      <BackgroundImg src={bannerImg} />
      <ContentWrapper>
        <Text variant="h3" align="center" color="white">
          언체인
        </Text>
        <Text variant="h6" align="center" color="white">
          투명한 디지털 자산 거래소
        </Text>
      </ContentWrapper>
    </Container>
  );
}

export default Banner;
