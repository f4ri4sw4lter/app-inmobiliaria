import { useState, useEffect } from "react";
import { getListaContratos } from "../helpers";

export const useFetchListaContratos = ( contratoId ) => {
    
    const [listaContratos, setListaContratos] = useState([]);
    const [isLoadingContratos, setIsLoading] = useState( true );

    const fetchContratos = async (contratoId) => {

        setIsLoading(true)
        try{
            getListaContratos( contratoId )
            .then(({ contratos }) => {
                setListaContratos(contratos)
                setIsLoading(false)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchContratos(contratoId);
    }, []);
    
    return {
        listaContratos,
        isLoadingContratos,
        fetchContratos
    }
}