import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";
import NavbarAdmin from "./navbar.admin";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {},
  },
  typography: {
    fontFamily: "Roboto",
  },
  components: {},
});

export const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="">
          <NavbarAdmin />
        </div>
        <div className="h-full w-dvw">{children}</div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
