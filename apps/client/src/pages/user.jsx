import { Helmet } from 'react-helmet-async';

import { ListaUserView } from '../sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Usuarios </title>
      </Helmet>

      <ListaUserView />
    </>
  );
}
