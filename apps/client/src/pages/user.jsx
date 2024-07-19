import { Helmet } from 'react-helmet-async';

import { ListaUserView, UserCreateView } from '../sections/user/view';
import { useParams } from 'react-router-dom';
import UserEditView from '../sections/user/view/user-edit-view';

// ----------------------------------------------------------------------

export default function UserPage() {

  const { accion, id } = useParams();

  function SeleccionarVista() {

    if (typeof accion == 'undefined') {
      return (<ListaUserView />)
    } else {
      if (accion == 'crear') {
        return (<UserCreateView />)
      }
      if (accion == 'ver') {
        return (<ListaUserView />)
      }
      else if (accion == 'editar') {
        return (<UserEditView />)
      }
      else {
        return (<NotFoundPage />)
      }
    }
    
  }

  return (
    <>
      <Helmet>
        <title> Usuarios </title>
      </Helmet>

      <SeleccionarVista />
    </>
  );
}
