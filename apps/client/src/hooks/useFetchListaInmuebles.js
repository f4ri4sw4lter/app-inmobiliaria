import { useState, useEffect } from "react";
import { getListaInmuebles } from "../helpers";

export const useFetchListaInmuebles = (orderBy) => {
    
    const [listaInmuebles, setListaInmuebles] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getListaInmuebles()
            .then(({ propiedades }) => {
                if(orderBy){
                    propiedades.sort((a, b) => a.titulo.localeCompare(b.titulo));
                }
                setListaInmuebles(propiedades)
                setIsLoading( false )
            })
    }, []);
    
    return {
        listaInmuebles,
        isLoading
    }
}