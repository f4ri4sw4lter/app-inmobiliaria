import { Helmet } from 'react-helmet-async';
import { FrontInicioView } from '../sections/front/view/'
import { ListaClientesView } from '../sections/clientes/view';
import { useParams } from 'react-router-dom';
import FrontPropiedadView from '../sections/front/view/front-propiedad-view';

export default function FrontPage() {

    const { propiedadId } = useParams();

    function SeleccionarVista() {
        if (typeof propiedadId == 'undefined') {
            return (<FrontInicioView />)
        } else {
            return (<FrontPropiedadView />)
        }
    }

    return (
        <>
            <SeleccionarVista />
        </>
    );
}
