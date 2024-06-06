import './global.css';
import ThemeProvider from './theme';
import { useState, useEffect } from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';
import LoginPage from './pages/login';

// ----------------------------------------------------------------------

export default function App() {
  
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useScrollToTop();

  useEffect(() => {
    if (sessionStorage.getItem('User')) {
      setIsLogged(true);
    }
    setIsLoading(false)
  },[])
  
  return (
    !isLoading &&
      <ThemeProvider>
        {isLogged 
          ? <Router isLogged={isLogged} setIsLogged={setIsLogged} /> 
          : <LoginPage isLogged={isLogged} setIsLogged={setIsLogged} />
        }
      </ThemeProvider>
  );
}
