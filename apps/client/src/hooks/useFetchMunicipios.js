import { useEffect, useState } from "react";
import { getMunicipios } from "../helpers/getMunicipios";

export const useFetchMunicipios = ( id ) => {

    const [municipios, setMunicipios] = useState([]);
    const [municipiosIsLoading, setIsLoading] = useState( true );

    const fetchMunicipios = async (id) => {
        try{
            getMunicipios(id)
            .then(({ municipios }) => {
                setMunicipios(municipios);
                setIsLoading( false );
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchMunicipios(id);
    }, []);

    return {
        municipios,
        municipiosIsLoading,
        fetchMunicipios
    }
}