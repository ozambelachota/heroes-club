"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#fff",
    },
  },
});
export function ThemeProviderRoot({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
}
