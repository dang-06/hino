import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#10B981",
      light: "#464F60",
      dark: "#0157a2",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          variant: "contained",
          borderRadius: "8px",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": {
            borderBottom: "1px solid rgb(229 231 235/1)",
          },
          
         
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          // input: {
          //   padding: '6px 14px',
          // },

          // select: {
          //   padding: '6px 14px',
          // },
          // ".MuiSelect-select":{
          //   padding: '6px 14px',
          //   color: '#464F60'
          // }
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
  },
});
