import axios from 'axios';

export const updateInmueble = async( data ) => {

    const apiUrl = `/api/propiedad/update/${data.id}`;

    const body = {
        titulo: data.titulo
    };

    const response = await axios.put(baseUrl,body,{
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response.data
}