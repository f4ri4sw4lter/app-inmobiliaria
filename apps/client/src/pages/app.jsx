import { Helmet } from 'react-helmet-async';

import { AppView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Ferreyra | Inicio </title>
      </Helmet>

      <AppView />
    </>
  );
}
