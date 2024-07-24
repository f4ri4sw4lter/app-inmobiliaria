import { Helmet } from 'react-helmet-async';

import { ListaClientesView, ClienteEditView, ClienteView, ClienteCreateView } from '../sections/clientes/view';
import { useFetchClienteById } from '../hooks/useFetchClienteById';
import { useParams } from 'react-router-dom';


export default function ClientePage() {

    const { accion, id } = useParams();

    function SeleccionarVista() {
        if (typeof accion == 'undefined') {
            return (<ListaClientesView />)
        } else {
            if (accion == 'crear') {
                return (<ClienteCreateView />)
            }
            if (accion == 'ver') {
                return (<ClienteView />)
            }
            else if (accion == 'editar') {
                return (<ClienteEditView />)
            }
            else {
                return (<NotFoundPage />)
            }
        }
    }

    return (
        <>
            <Helmet>
                <title> Ferreyra | Clientes </title>
            </Helmet>

            <SeleccionarVista />
        </>
    );
}
