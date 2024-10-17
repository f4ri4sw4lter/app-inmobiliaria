import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useRouter } from '../routes/hooks';
import { LoginView } from '../sections/login';
import { useParams } from 'react-router-dom';
import RecuperatePaso1View from '../sections/login/recuperate-paso1-view';
import RecuperatePaso2View from '../sections/login/recuperate-paso2-view';

// ----------------------------------------------------------------------

export default function LoginPage({setIsLogged, setUser}) {

  const { paso } = useParams();
  const [ emailToReset, setEmailToReset ] = useState('');

  function SeleccionarVista (){
    if (typeof paso == 'undefined') { return(<LoginView setIsLogged={setIsLogged} setUser={setUser}/>) }
    else if (paso == '1') { return(<RecuperatePaso1View setEmailToReset={setEmailToReset} />) }
    else if (paso == '2') { return(<RecuperatePaso2View emailToReset={emailToReset} />) }
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
