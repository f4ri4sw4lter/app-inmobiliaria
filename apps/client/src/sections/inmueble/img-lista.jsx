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

    const { listaImages, isLoading } = useFetchListaImages(id);
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
            setUrlBanner(`/public/assets/propiedades/${listaImages[0].filename}`);
        }
    }, [listaImages]);

    return (
        listaImages.length > 0 &&

        <>
            <Stack>
                <Card>
                    <CardMedia component="img" height="340" width="100%" image={urlBanner} />
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
                            onClick={() => setUrlBanner(`/public/assets/propiedades/${img.filename}`)}>
                            <CardMedia
                                component="img"
                                height="140"
                                width="400"
                                image={`/public/assets/propiedades/${img.filename}`}
                                alt="foto de la propiedad"
                            />
                        </StyledCard>
                    ))}
            </Stack>
        </>
    );
};

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    }
];