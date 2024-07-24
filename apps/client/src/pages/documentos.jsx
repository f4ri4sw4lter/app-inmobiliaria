import { Helmet } from 'react-helmet-async';
import ListaDocsView from '../sections/documentos/view/lista-docs-view';

// ----------------------------------------------------------------------

export default function DocumentosPage() {

    return (
        <>
            <Helmet>
                <title> Ferreyra | Documentos </title>
            </Helmet>

            <ListaDocsView />
        </>
    );
}
