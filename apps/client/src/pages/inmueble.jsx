import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";

import NotFoundPage from '../pages/page-not-found';
import { ListaInmuebleView, InmuebleView } from '../sections/inmueble/view';

// ----------------------------------------------------------------------

export default function InmueblePage() {

  const { accion, id } = useParams();
  return (
    <>
      <Helmet>
        <title> Inmuebles </title>
      </Helmet>

      { 
        (typeof accion == 'undefined')
          ? <ListaInmuebleView />
          : (accion=='ver' || accion=='editar')
            ? (typeof id == 'undefined')
              ? <NotFoundPage />
              : <InmuebleView />
            : <NotFoundPage />
      }
    </>
  );
}
