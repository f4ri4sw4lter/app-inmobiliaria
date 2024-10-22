import { useState, useEffect } from "react";
import { getListaMensajes } from "../helpers";

export const useFetchListaMensajes = (noLeidos) => {
    
    const [listaMensajes, setListaMensajes] = useState([]);
    const [isLoadingMensajes, setIsLoading] = useState( true );

    const fetchMensajes = async () => {

        setIsLoading(true)
        try{
            getListaMensajes(noLeidos)
            .then(({ mensajes }) => {
                setListaMensajes(mensajes)
                setIsLoading(false)
            })
        } catch (err) {
            console.error(err)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchMensajes();
    }, []);
    
    return {
        listaMensajes,
        isLoadingMensajes,
        fetchMensajes
    }
}