import { Helmet } from 'react-helmet-async';

import { InmuebleView } from '../sections/inmueble/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <>
      <Helmet>
        <title> Inmuebles </title>
      </Helmet>

      <InmuebleView />
    </>
  );
}
