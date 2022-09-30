import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import Layout from "./components/Layout";
import TradePage from "./pages/TradePage";
import TrendsPage from "./pages/TrendsPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import NotFoundPage from "./pages/NotFoundPage";
import TradeTDCPage from "./pages/TradeTDCPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="trade" element={<TradePage />} />
          <Route path="trends" element={<TrendsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="tradeTDC" element={<TradeTDCPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
