import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";

import NotFoundPage from '../pages/page-not-found';
import { ListaInmuebleView, InmuebleView, InmuebleEditView } from '../sections/inmueble/view';
import { useFetchInmuebleById } from '../hooks/useFetchInmueblesById';

// ----------------------------------------------------------------------

export default function InmueblePage() {

  const { accion, id } = useParams();

  const { inmueble, isLoading } = useFetchInmuebleById({ id });

  return (
    <>
      <Helmet>
        <title> Inmuebles </title>
      </Helmet>

      { (typeof accion == 'undefined')
        ? <ListaInmuebleView />
        : (accion == 'ver' || accion == 'editar')
          ? (typeof inmueble !== 'undefined') 
            ? (accion == 'ver')
              ? <InmuebleView />
              : <InmuebleEditView />
            :<NotFoundPage />
          : <NotFoundPage />
      }
    </>
  );
}
