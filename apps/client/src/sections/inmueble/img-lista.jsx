import * as React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useFetchListaImages } from '../../hooks/useFetchListaImages';
import { styled } from '@mui/material/styles';

export const HorizontalImageList = ({ id }) => {

    const { listaImages, isLoading } = useFetchListaImages('propiedad', id);
    const [urlBanner, setUrlBanner] = React.useState('');


    const StyledCard = styled(Card)(({ theme }) => ({
        '&:hover': {
            '& .MuiCardMedia-root': {
                transform: 'scale(1.05)', // Ajusta el nivel de escala
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)', // Ajusta el estilo de la sombra
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // Asegura una transición suave
            },
        },
    }));

    useEffect(() => {
        if (listaImages.length > 0) {
            setUrlBanner(`/public/assets/images/propiedades/${listaImages[0].filename}`);
        }
    }, [listaImages]);

    return (
        listaImages.length > 0 &&

        <>
            <Stack>
                <Card width="100%">
                    <CardMedia component="img" height="480" image={urlBanner} />
                    <CardContent>
                    </CardContent>
                </Card>
            </Stack>

            <Stack direction="row" spacing={2}>
                {listaImages
                    .map((img, index) => (
                        <StyledCard
                            key={index}
                            style={{ hover: { cursor: 'pointer' } }}
                            onClick={() => setUrlBanner(`/public/assets/images/propiedades/${img.filename}`)}>
                            <CardMedia
                                component="img"
                                height="140"
                                width="400"
                                image={`/public/assets/images/propiedades/${img.filename}`}
                                alt="foto de la propiedad"
                            />
                        </StyledCard>
                    ))}
            </Stack>
        </>
    );
};