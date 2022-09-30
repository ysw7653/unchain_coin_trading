import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffc107",
    },
    secondary: {
      main: "#888888",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#ffc107",
              color: "black",
            }),
        }),
      },
    },
  },
  typography: {
    fontFamily: [
      "SUIT-Medium",
      "Pretendard-Regular",
      "Roboto",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
