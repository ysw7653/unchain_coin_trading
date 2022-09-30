import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Container = styled.main`
  box-sizing: border-box;
  margin: 0 auto 3rem auto;
  padding: 3rem;
  max-width: 1540px;
  min-height: 80vh;
`;

function Layout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default Layout;
