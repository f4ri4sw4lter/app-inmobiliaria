import { useState, useEffect } from "react";
import { getContratoByClienteId } from "../helpers";

export const useFetchContratoByCliente = (id) => {
    
    const [contrato, setContrato] = useState([]);
    const [contratoIsLoading, setIsLoading] = useState( true );

    const fetchContratoByCliente = async (id) => {

        if(id != null && id != undefined){

            try{
                getContratoByClienteId(id)
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
        fetchContratoByCliente(id);
    }, []);
    
    return {
        contrato,
        contratoIsLoading,
        fetchContratoByCliente
    }
}