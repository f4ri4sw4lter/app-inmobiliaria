import { useState, useEffect } from "react";
import { getContratoById } from "../helpers";

export const useFetchContratoById = (id) => {
    
    const [contrato, setContrato] = useState([]);
    const [contratoIsLoading, setIsLoading] = useState( true );

    const fetchContrato = async (id) => {

        if(id != null && id != undefined){

            try{
                getContratoById(id)
                .then(({ contrato }) => {
                    setContrato(contrato);
                    setIsLoading(false);
                })
            } catch (err) {
                console.error(err)
            }
        }
    }

    useEffect(() => {
        fetchContrato(id);
    }, []);
    
    return {
        contrato,
        contratoIsLoading,
        fetchContrato
    }
}