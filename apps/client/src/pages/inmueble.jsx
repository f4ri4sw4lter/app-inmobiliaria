import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import NotFoundPage from '../pages/page-not-found';
import { ListaInmuebleView, InmuebleView, InmuebleEditView, InmuebleCreateView } from '../sections/inmueble/view';
import { useFetchInmuebleById } from '../hooks/useFetchInmueblesById';

// ----------------------------------------------------------------------

export default function InmueblePage() {

  const { accion, id } = useParams();

  function SeleccionarVista (){
    if(typeof accion == 'undefined'){
      return(<ListaInmuebleView />)
    }else{
      if(accion == 'crear'){
        return(<InmuebleCreateView />)
      }
      const { inmueble, isLoading } = useFetchInmuebleById({ id });
      if (accion == 'ver'){
        return(
          isLoading == false &&
          <InmuebleView />
        )
      }
      else if (accion == 'editar'){
        return(
          isLoading == false &&
          <InmuebleEditView />
        )
      }
      else{
        return(<NotFoundPage />)
      }
    }
  }

  return (
    <>
      <Helmet>
        <title> Inmuebles </title>
      </Helmet>

      <SeleccionarVista/>
    </>
  );
}
