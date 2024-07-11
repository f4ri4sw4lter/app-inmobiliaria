import { useState, useEffect } from "react";
import { getListaClientes } from "../helpers";

export const useFetchListaClientes = () => {
    
    const [listaClientes, setListaClientes] = useState([]);
    const [listaClientesIsLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getListaClientes()
            .then(({ clientes }) => {
                setListaClientes(clientes);
                setIsLoading(false);
            })
    }, []);
    
    return {
        listaClientes,
        listaClientesIsLoading
    }
}