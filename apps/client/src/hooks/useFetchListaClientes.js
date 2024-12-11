import { useState, useEffect } from "react";
import { getListaClientes } from "../helpers";

export const useFetchListaClientes = (orderBy) => {
    
    const [listaClientes, setListaClientes] = useState([]);
    const [listaClientesIsLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getListaClientes()
            .then(({ clientes }) => {
                if(orderBy){
                    clientes.sort((a, b) => a.apellido.localeCompare(b.apellido));
                }
                setListaClientes(clientes);
                setIsLoading(false);
            })
    }, []);
    
    return {
        listaClientes,
        listaClientesIsLoading
    }
}