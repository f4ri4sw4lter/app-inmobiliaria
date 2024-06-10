import React, { useState, useEffect } from 'react';
import { ModalUploadImg } from './modal-upload-img';
import { ImgListaEdit } from './img-lista-edit';
import { useFetchListaImages } from '../../hooks/useFetchListaImages';
import { Grid } from '@mui/material';

export const EditImgGrid = ({ id }) => {

    const { listaImages, isLoadingImages, fetchImages } = useFetchListaImages(id);

    const [listaImagenes, setListaImagenes] = useState({});

    useEffect(() => {
        console.log('Actualizando: ', listaImages)
        setListaImagenes(listaImages);
    }, [listaImages]);


    return (
        <Grid item xs={12}>
            <ModalUploadImg id={id} fetchImages={fetchImages} />

            <br />
            <br />
            <ImgListaEdit id={id} listaImagenes={listaImagenes} setListaImagenes={setListaImagenes} isLoading={isLoadingImages}/>
        </Grid>
    );
};

