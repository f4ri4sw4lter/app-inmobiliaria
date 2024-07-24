import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useRouter } from '../routes/hooks';
import { LoginView } from '../sections/login';

// ----------------------------------------------------------------------

export default function LoginPage({setIsLogged, setUser}) {

  return (
    <>
      <Helmet>
        <title> Login | FerreyraApp </title>
      </Helmet>

      <LoginView setIsLogged={setIsLogged} setUser={setUser}/>
    </>
  );
}
