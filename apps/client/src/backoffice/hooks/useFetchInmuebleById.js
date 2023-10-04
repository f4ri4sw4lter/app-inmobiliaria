import { useEffect, useState } from "react";
import { getInmuebleById } from "../helpers/getInmuebleById";

export const useFetchInmuebleById = ( id ) => {

    const [inmueble, setInmueble] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getInmuebleById(id)
            .then(({ propiedad }) => {
                setInmueble(propiedad)
            })
    }, []);

    return {
        inmueble,
        isLoading
    }
}
