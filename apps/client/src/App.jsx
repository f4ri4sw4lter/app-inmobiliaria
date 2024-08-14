import './global.css';
import ThemeProvider from './theme';
import { useState, useEffect } from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';
import LoginPage from './pages/login';
import Cookies from 'js-cookie';

// ----------------------------------------------------------------------

export default function App() {
  
  const [isLogged, setIsLogged] = useState(false);
  const [User, setUser] = useState();
  
  useScrollToTop();

  useEffect(() => {
    if(Cookies.get('User')){
      setIsLogged(true);
      setUser(JSON.parse(Cookies.get('User')));
    }
    if(isLogged){
      setUser(JSON.parse(Cookies.get('User')));
    }
  },[isLogged])
  
  return (
      <ThemeProvider>
        {isLogged 
          ? <Router User={User}/> 
          : <LoginPage setIsLogged={setIsLogged} setUser={setUser}/>
        }
      </ThemeProvider>
  );
}
