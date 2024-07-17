import { useState, useEffect } from "react";
import { getClienteById } from "../helpers";

export const useFetchClienteById = (id) => {
    
    const [cliente, setCliente] = useState([]);
    const [clienteIsLoading, setIsLoading] = useState( true );

    const fetchCliente = async (id) => {

        if(id != null && id != undefined){

            try{
                getClienteById(id)
                .then(({ cliente }) => {
                    setCliente(cliente);
                    setIsLoading(false);
                })
            } catch (err) {
                console.error(err)
            }
        }
    }

    useEffect(() => {
        fetchCliente(id);
    }, []);
    
    return {
        cliente,
        clienteIsLoading,
        fetchCliente
    }
}