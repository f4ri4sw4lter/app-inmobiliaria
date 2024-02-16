import { Carousel } from 'react-material-ui-carousel';
import Card from '@mui/material/Card';

const items = [
    {
        image: 'url_de_la_imagen_1.jpg',
        caption: 'Descripción de la imagen 1',
    },
    {
        image: 'url_de_la_imagen_2.jpg',
        caption: 'Descripción de la imagen 2',
    },
    // Agrega más objetos para más imágenes
];

export const ImgCarousel = () => {
    return (
        <Carousel>
            {items.map((item, index) => (
                <Item key={index} item={item} />
            ))}
        </Carousel>
    );
};

const Item = ({ item }) => {
    return (
        <Card>
            <img src={item.image} alt={item.caption} style={{ width: '100%' }} />
            <p>{item.caption}</p>
        </Card>
    );
};