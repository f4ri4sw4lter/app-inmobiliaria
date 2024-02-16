import axios from 'axios';

export const updateInmueble = async( data ) => {

    const apiUrl = `/api/propiedad/update/${data.id}`;

    const body = {
        titulo: data.titulo
    };

    const requestConfig = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    };

    fetch(apiUrl, requestConfig)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}