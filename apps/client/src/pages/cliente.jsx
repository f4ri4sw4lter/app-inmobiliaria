import { Helmet } from 'react-helmet-async';

import { ListaClientesView } from '../sections/clientes/view';

// ----------------------------------------------------------------------

export default function ClientePage() {
    return (
        <>
            <Helmet>
                <title> Clientes </title>
            </Helmet>

            <ListaClientesView />
        </>
    );
}
