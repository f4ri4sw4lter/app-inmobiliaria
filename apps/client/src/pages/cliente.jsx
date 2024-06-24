import { Helmet } from 'react-helmet-async';

import { ListaClientesView } from '../sections/clientes/view';

// ----------------------------------------------------------------------

export default function ClientePage() {
    return (
        <>
            <Helmet>
                <title> Usuarios </title>
            </Helmet>

            <ListaClientesView />
        </>
    );
}
