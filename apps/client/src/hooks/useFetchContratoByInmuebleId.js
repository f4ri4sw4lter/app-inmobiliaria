import { useState, useEffect } from "react";
import { getContratoByInmuebleId } from "../helpers";

export const useFetchContratoByInmueble = (id) => {
    
    const [contrato, setContrato] = useState([]);
    const [contratoIsLoading, setIsLoading] = useState( true );

    const fetchContratoByInmueble = async (id) => {

        if(id != null && id != undefined){

            try{
                getContratoByInmuebleId(id)
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
        fetchContratoByInmueble(id);
    }, []);
    
    return {
        contrato,
        contratoIsLoading,
        fetchContratoByInmueble
    }
}