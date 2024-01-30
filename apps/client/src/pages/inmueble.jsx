import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import NotFoundPage from '../pages/page-not-found';
import { ListaInmuebleView, InmuebleView, InmuebleEditView, InmuebleCreateView } from '../sections/inmueble/view';
import { useFetchInmuebleById } from '../hooks/useFetchInmueblesById';

// ----------------------------------------------------------------------

export default function InmueblePage() {

  const { accion, id } = useParams();

  const { inmueble, isLoading } = useFetchInmuebleById({ id });

  const [view, setView] = useState();

  useEffect(() => {
    if(typeof accion == 'undefined'){
      setView(<ListaInmuebleView />)
    }else{
      if(accion == 'ver' || accion == 'editar' || accion == 'crear'){
        if(typeof inmueble !== 'undefined'){
            if (accion == 'ver') setView(<InmuebleView />)
            
            if (accion == 'editar') setView(<InmuebleEditView />)
            
            if (accion == 'crear') setView(<InmuebleCreateView />)
        }else{
          setView(<NotFoundPage />)
        }
      }else{
        setView(<NotFoundPage />)
      }
    }
  },[])

  return (
    <>
      <Helmet>
        <title> Inmuebles </title>
      </Helmet>

      { view }
    </>
  );
}
