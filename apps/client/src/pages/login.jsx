import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useRouter } from '../routes/hooks';
import { LoginView } from '../sections/login';

// ----------------------------------------------------------------------

export default function LoginPage({isLogged, setIsLogged}) {

  const router = useRouter();
    useEffect(() => {
    if (isLogged) {
      router.push('/');
    }
  },[])

  return (
    <>
      <Helmet>
        <title> Login | FerreyraApp </title>
      </Helmet>

      <LoginView isLogged={isLogged} setIsLogged={setIsLogged}/>
    </>
  );
}
