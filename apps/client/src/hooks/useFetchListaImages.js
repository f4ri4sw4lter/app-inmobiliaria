import { useState, useEffect } from "react";
import { getListaImagesById } from "../helpers";

export const useFetchListaImages = ( id ) => {
    
    const [listaImages, setListaImages] = useState([]);
    const [isLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getListaImagesById( id )
            .then(({ images }) => {
                setListaImages(images)
                setIsLoading(false)
            })
    }, []);
    
    return {
        listaImages,
        isLoading
    }
}