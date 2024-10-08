import './global.css';
import ThemeProvider from './theme';
import { useState, useEffect } from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';
import LoginPage from './pages/login';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function App() {

  const [User, setUser] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useScrollToTop();

  useEffect(() => {
    if (Cookies.get('User')) {
      setIsLogged(true);
      const usr = Cookies.get('User') ? JSON.parse(Cookies.get('User')) : '';
      setUser(usr);
    }
    setIsLoading(false);
  }, [isLogged])

  return (
    <ThemeProvider>
      {isLoading
        ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress color="primary"/>
          </Box>

        : <Router User={User} setIsLogged={setIsLogged} setUser={setUser}/>
      }
    </ThemeProvider>
  );
}
