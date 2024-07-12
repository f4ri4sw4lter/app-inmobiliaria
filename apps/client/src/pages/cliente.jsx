import { Helmet } from 'react-helmet-async';

import { ListaClientesView } from '../sections/clientes/view';
import { useFetchClienteById } from '../hooks/useFetchClienteById';
import { useParams } from 'react-router-dom';
import ClienteCreateView from '../sections/clientes/view/cliente-create-view';


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
                return (
                    isLoading == false &&
                    <ClientesView />
                )
            }
            else if (accion == 'editar') {
                return (
                    isLoading == false &&
                    <ClientesEditView />
                )
            }
            else {
                return (<NotFoundPage />)
            }
        }
    }

    return (
        <>
            <Helmet>
                <title> Clientes </title>
            </Helmet>

            <SeleccionarVista />
        </>
    );
}
