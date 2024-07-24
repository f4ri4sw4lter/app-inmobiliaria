import './global.css';
import ThemeProvider from './theme';
import { useState, useEffect } from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';
import LoginPage from './pages/login';

// ----------------------------------------------------------------------

export default function App() {
  
  const [isLogged, setIsLogged] = useState(false);
  const [User, setUser] = useState();
  
  useScrollToTop();

  useEffect(() => {
    if(sessionStorage.getItem('User')){
      setIsLogged(true);
      setUser(JSON.parse(sessionStorage.getItem('User')));
    }
    if(isLogged){
      setUser(JSON.parse(sessionStorage.getItem('User')));
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
