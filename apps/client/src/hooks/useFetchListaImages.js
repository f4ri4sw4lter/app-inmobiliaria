import { useState, useEffect } from "react";
import { getListaImagesById } from "../helpers";

export const useFetchListaImages = ( reference, id ) => {
    
    const [listaImages, setListaImages] = useState([]);
    const [isLoadingImages, setIsLoading] = useState( true );

    const fetchImages = async () => {

        setIsLoading(true)
        try{
            getListaImagesById( reference, id )
            .then(({ images }) => {
                setListaImages(images)
                setIsLoading(false)
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchImages();
    }, []);
    
    return {
        listaImages,
        isLoadingImages,
        fetchImages
    }
}