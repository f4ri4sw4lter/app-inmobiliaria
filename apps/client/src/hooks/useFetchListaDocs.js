import { useState, useEffect } from "react";
import { getListaDocsByOwnerId } from "../helpers";

export const useFetchListaDocs = ( ownerId ) => {
    
    const [listaDocs, setListaDocs] = useState([]);
    const [isLoadingDocs, setIsLoading] = useState( true );

    const fetchDocs = async (ownerId) => {

        setIsLoading(true)
        try{
            getListaDocsByOwnerId( ownerId )
            .then(({ docs }) => {
                setListaDocs(docs)
                setIsLoading(false)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchDocs(ownerId);
    }, []);
    
    return {
        listaDocs,
        isLoadingDocs,
        fetchDocs
    }
}