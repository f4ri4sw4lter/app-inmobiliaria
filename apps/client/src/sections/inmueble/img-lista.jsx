import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

export const HorizontalImageList = () => {



    return (
        <>
            <Stack>
                <Card>
                    <CardMedia component="img" height="340" width="100%" image='https://images.unsplash.com/photo-1551963831-b3b1ca40c98e'  />
                    <CardContent>
                    </CardContent>
                </Card>
            </Stack>
            <Stack direction="row" spacing={2}>
                {itemData.map((item, index) => (
                    <Card key={index}>
                        <CardMedia component="img" height="140" width="400" image={item.img} alt={item.title} />
                    </Card>
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