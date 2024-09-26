import { useEffect, useState } from "react";
import { getUltimosCincoContratos } from "../helpers/getUltimosCincoContratos";

export const useFetchUltimosCincoContratos = () => {

    const [ultimosCinco, setUltimosCinco] = useState([]);
    const [ultimosCincoIsLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getUltimosCincoContratos()
            .then(({ contratos }) => {
                setUltimosCinco(contratos);
                setIsLoading( false );
            })
    }, []);

    return {
        ultimosCinco,
        ultimosCincoIsLoading
    }
}