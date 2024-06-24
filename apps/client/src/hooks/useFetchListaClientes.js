import { useState, useEffect } from "react";
import { getListaClientes } from "../helpers";

export const useFetchListaClientes = () => {
    
    const [listaClientes, setListaClientes] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getListaClientes()
            .then(({ clientes }) => {
                setListaClientes(clientes)
            })
    }, []);
    
    return {
        listaClientes,
        isLoading
    }
}