import { Global } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import reset from "emotion-reset";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import App from "./App";
import theme from "./styles/theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <App />
      <Global styles={reset} />
    </RecoilRoot>
  </ThemeProvider>
);
