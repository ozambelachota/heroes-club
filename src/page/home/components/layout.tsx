import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { NavbarPublic } from "./navbar.component";

const thmee = createTheme({
 
  palette: {
    background: {
      default: "#000000",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#212121",
    },
    secondary: {
      main: "#f50057",
    },
    mode: "dark",
  },
  
});
export const LayoutPublic = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider theme={thmee}>
        <CssBaseline />
        <div>
          <NavbarPublic />
        </div>
        {children}
      </ThemeProvider>
    </>
  );
};
