import './global.css';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState, useEffect } from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';
import LoginPage from './pages/login';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { getUser } from './utils/user';

// ----------------------------------------------------------------------

export default function App() {

  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTop();

  useEffect(() => {

    const User = getUser();

    if (User != '') {
      setIsLogged(true);
    }

    setIsLoading(false)

  }, [])

  const theme = createTheme({
    components: {
      MuiInput: {
        styleOverrides: {
          root: {
            border: "1px solid rgba(0, 0, 0, 0.42)",
            borderRadius: "5px",
            borderBottom: "0px",
            overflow: "hidden", // Prevenir bordes que sobresalgan
            "& fieldset": {
              padding: "20px",
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {isLoading
        ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress color="primary" />
        </Box>

        : <Router setIsLogged={setIsLogged} />
      }
    </ThemeProvider>
  );
}
