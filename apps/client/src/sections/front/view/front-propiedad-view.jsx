import { useParams } from "react-router-dom";
import { useFetchInmuebleById } from "../../../hooks/useFetchInmueblesById";
import { HTMLComponent } from '../HTMLComponent'
export default function FrontPropiedadView() {

    const { propiedadId } = useParams();

    const { inmueble, isLoading } = useFetchInmuebleById(propiedadId);

    return (
        <>
        <HTMLComponent/>
        </>
    );
}
            