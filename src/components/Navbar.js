import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import theme from "@/styles/theme";
import Text from "./Text";

const NavBarContainer = styled.nav`
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  height: 4rem;
  padding: 0 2rem;
  background-color: #212529;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 1.125rem;
  font-weight: 800;

  border: none;
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  outline: none;
  cursor: pointer;
  &:hover,
  &.active {
    color: ${theme.palette.primary.main};
  }
`;

const pages = [
  { name: "언체인", to: "/" },
  { name: "거래소", to: "/trade" },
  { name: "코인동향", to: "/trends" },
  { name: "TDC", to: "/tradeTDC" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NavBarContainer>
      <ButtonContainer>
        {pages.map((page) => (
          <StyledLink to={page.to} key={page.name}>
            <Text
              variant="subtitle1"
              align="center"
              fontWeight={600}
              color={
                location.pathname === page.to && theme.palette.primary.main
              }
            >
              {page.name}
            </Text>
          </StyledLink>
        ))}
      </ButtonContainer>
      <ButtonContainer>
        <Button variant="contained" onClick={() => navigate("login")}>
          <Text variant="subtitle2" align="center" fontWeight={600}>
            로그인
          </Text>
        </Button>
        <Button variant="contained" onClick={() => navigate("signin")}>
          <Text variant="subtitle2" align="center" fontWeight={600}>
            회원가입
          </Text>
        </Button>
      </ButtonContainer>
    </NavBarContainer>
  );
};
export default Navbar;
