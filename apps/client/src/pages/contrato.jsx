import { Helmet } from 'react-helmet-async';

import { ListaClientesView, ClienteEditView, ClienteView, ClienteCreateView } from '../sections/clientes/view';
import { useParams } from 'react-router-dom';
import ListaContratosView from '../sections/contrato/view/lista-contratos-view';


export default function ContratoPage() {

    const { accion, id } = useParams();

    function SeleccionarVista() {
        if (typeof accion == 'undefined') {
            return (<ListaContratosView />)
        } else {
            if (accion == 'crear') {
                return (<ListaContratosView />)
            }
            if (accion == 'ver') {
                return (<ListaContratosView />)
            }
            else if (accion == 'editar') {
                return (<ListaContratosView />)
            }
            else {
                return (<NotFoundPage />)
            }
        }
    }

    return (
        <>
            <Helmet>
                <title> Ferreyra | Contratos </title>
            </Helmet>

            <SeleccionarVista />
        </>
    );
}
