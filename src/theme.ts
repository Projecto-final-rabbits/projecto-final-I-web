// theme.ts

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    gray: string;
  }
  interface TypeBackground {
    gray: string;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#64748B", // slate-500
      light: "#94A3B8", // slate-400
      dark: "#334155", // slate-700
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#18181B", // slate-900
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFF", // slate-100
      paper: "#FFFFFF",
      gray: "#F4F4F5",
    },
    text: {
      primary: "#0F172A", // slate-900
      secondary: "#64748B", // slate-500
      disabled: "#94A3B8", // slate-400
    },
    divider: "#E2E8F0", // slate-200
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    h3: { fontSize: "1.5rem", fontWeight: 600 },
    h4: { fontSize: "1.25rem", fontWeight: 600 },
    h5: { fontSize: "1rem", fontWeight: 600 },
    h6: { fontSize: "0.875rem", fontWeight: 600 },
    body1: { fontSize: "1rem", fontWeight: 400 },
    body2: { fontSize: "0.875rem", fontWeight: 400 },
    subtitle1: { fontSize: "0.875rem", fontWeight: 500 },
    subtitle2: { fontSize: "0.75rem", fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  breakpoints: {
    values: {
      xs: 0, // Mobile devices
      sm: 600, // Tablets
      md: 900, // Small desktops
      lg: 1200, // Standard desktops
      xl: 1536, // Large desktops/screens
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: "8px 16px",
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
          border: "1px solid #E4E4E7",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
          },
        },
      },
    },
  },
});

export default theme;
