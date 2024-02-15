import { useEffect, useState } from "react";
import { getMunicipios } from "../helpers/getMunicipios";

export const useFetchMunicipios = ( id ) => {

    const [municipios, setMunicipios] = useState([]);
    const [municipiosIsLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getMunicipios(id)
            .then(({ municipios }) => {
                setMunicipios(municipios);
                setIsLoading( false );
            })
    }, []);

    return {
        municipios,
        municipiosIsLoading
    }
}