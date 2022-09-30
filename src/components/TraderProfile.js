import styled from "@emotion/styled";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import Text from "./Text";

const ProfileCard = styled(Card)`
  height: 800;
`;

const ContentWrapper = styled(CardContent)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonWrapper = styled(CardActions)`
  justify-content: end;
`;

function TraderProfile({
  name,
  imageUrl,
  introduce,
  profit,
  quantity,
  follower,
  onClick,
}) {
  return (
    <ProfileCard>
      <CardMedia component="img" image={imageUrl} height="300" />
      <ContentWrapper>
        <Text variant="h6" weight={600}>
          {name}
        </Text>
        <Text variant="subtitle2" weight={600} color="#666">
          {introduce}
        </Text>
        <Divider />
        <ItemWrapper>
          <Text weight={600}>수익</Text>
          <Text>{`${profit}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
        </ItemWrapper>
        <ItemWrapper>
          <Text weight={600}>거래 횟수</Text>
          <Text>{quantity} 건</Text>
        </ItemWrapper>
        <ItemWrapper>
          <Text weight={600}>팔로워</Text>
          <Text>{follower} 명</Text>
        </ItemWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Button color="success" onClick={onClick}>
          <Text weight={600}>주소 선택</Text>
        </Button>
      </ButtonWrapper>
    </ProfileCard>
  );
}

export default TraderProfile;
