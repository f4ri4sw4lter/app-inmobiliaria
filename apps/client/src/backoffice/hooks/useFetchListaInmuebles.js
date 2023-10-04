import { useState, useEffect } from "react";
import { getListaInmuebles } from "../helpers";

export const useFetchListaInmuebles = () => {
    
    const [listaInmuebles, setListaInmuebles] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getListaInmuebles()
            .then(( reponse ) => {
                setListaInmuebles(reponse)
            })
        console.log(reponse)
    }, []);
    
    return {
        listaInmuebles,
        isLoading
    }
}
