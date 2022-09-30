import styled from "@emotion/styled";
import dayjs from "dayjs";
import Text from "./Text";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.2rem;
  box-sizing: border-box;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 1px 10px 0px;
`;

function NewsBanner({ title, subTitle, timeLine, date, ...styleProps }) {
  return (
    <Container style={{ ...styleProps }}>
      <Text weight={700}>{title}</Text>
      <Text variant="subtitle2" color="#444">
        {subTitle.replace("<br />", " ")}
      </Text>
      <Text variant="caption" color="gray" weight={600}>
        {timeLine.includes("일")
          ? dayjs(date).format("YYYY년 MM월 DD일 A hh:mm")
          : timeLine}
      </Text>
    </Container>
  );
}

export default NewsBanner;
