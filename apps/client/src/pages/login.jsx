import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useRouter } from '../routes/hooks';
import { LoginView } from '../sections/login';
import { useParams } from 'react-router-dom';
import RecuperatePaso1View from '../sections/login/recuperate-paso1-view';

// ----------------------------------------------------------------------

export default function LoginPage({setIsLogged, setUser}) {

  const { paso } = useParams();

  function SeleccionarVista (){
    if (typeof paso == 'undefined') { return(<LoginView setIsLogged={setIsLogged} setUser={setUser}/>) }
    else if (paso == '1') { return(<RecuperatePaso1View />) }
  }

  return (
    <>
      <Helmet>
        <title> Login | FerreyraApp </title>
      </Helmet>

      
      <SeleccionarVista />
    </>
  );
}
