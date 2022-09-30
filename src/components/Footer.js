import styled from "@emotion/styled";
import Text from "./Text";

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 100%;
`;

function Footer() {
  return (
    <Container>
      <Text variant="caption" align="center" color="gray">
        Copyright 2022
      </Text>
    </Container>
  );
}

export default Footer;
