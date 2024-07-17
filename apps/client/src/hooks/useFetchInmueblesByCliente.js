import { useEffect, useState } from "react";
import { getInmueblesByCliente } from "../helpers/";

export const useFetchInmueblesByCliente = ( ) => {

    const [inmuebles, setInmueble] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    const fetchInmueblesByCliente = async (id ) => {
        setIsLoading( true );
        try{
            getInmueblesByCliente( id )
            .then(( {propiedades} ) => {
                setInmueble(propiedades);
                setIsLoading( false );
            })
        } catch (err) {
            console.error(err)
        }
    }
    
    useEffect(() => {
        fetchInmueblesByCliente();
    }, []);

    return {
        inmuebles,
        isLoading,
        fetchInmueblesByCliente,
    }
}