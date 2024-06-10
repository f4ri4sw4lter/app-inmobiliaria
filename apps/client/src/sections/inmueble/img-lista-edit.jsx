import * as React from 'react';
import { Stack, Card, CardMedia, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFetchListaImages } from '../../hooks/useFetchListaImages';
import { useState, useEffect } from 'react';
import { deleteImageById } from '../../helpers/deleteImageById';

export const ImgListaEdit = ({listaImagenes, setListaImagenes, isLoading}) => {

    const handleDelete = (event, id) => {
        if(window.confirm("Deseas borrar esta imagen?")){
            deleteImageById(id);
            const newArray = listaImagenes.filter(item => item._id !== id);
            setListaImagenes(newArray);
        }
    }

    return (
        isLoading 
            ? <p>Cargando...</p>
            :<> 
            <Stack direction="row" spacing={2}>
                { listaImagenes.length > 0 &&
                    listaImagenes.map((img, index) => (
                        <Card key={index}>
                            <IconButton
                                aria-label="delete"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    zIndex: 1,
                                    backgroundColor: 'white',
                                    '&:hover': {
                                        backgroundColor: 'red',
                                    },
                                }}
                                onClick={() => handleDelete(event, img._id)}
                            >
                                <CloseIcon />
                            </IconButton>
                            <CardMedia component="img" height="140" width="400" image={`/public/assets/propiedades/${img.filename}`} alt="foto de la propiedad" />
                        </Card>
                    ))
                }
            </Stack>
        </>
    );
};