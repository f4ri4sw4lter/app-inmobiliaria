import axios from 'axios';

export const createInmueble = async( data ) => {

    const apiUrl = `/api/propiedad/create`;

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    fetch(apiUrl, requestConfig)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}