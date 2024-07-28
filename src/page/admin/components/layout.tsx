import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactNode } from "react";
import NavbarAdmin from "./navbar.admin";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {},
});

export const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
          <NavbarAdmin />
        </div>
        <div>{children}</div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
