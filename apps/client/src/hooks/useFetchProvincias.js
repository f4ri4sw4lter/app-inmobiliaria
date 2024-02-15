import { useEffect, useState } from "react";
import { getProvincias } from "../helpers/getProvincias";

export const useFetchProvincias = () => {

    const [provincias, setProvincias] = useState([]);
    const [provinciasIsLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getProvincias()
            .then(({ provincias }) => {
                setProvincias(provincias);
                setIsLoading( false );
            })
    }, []);

    return {
        provincias,
        provinciasIsLoading
    }
}