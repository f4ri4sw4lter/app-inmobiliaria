import axios from 'axios';
const User = JSON.parse(localStorage.getItem('User'));

export const updateInmueble = async( data ) => {

    const apiUrl = `/api/propiedad/update/${data.id}`;

    const body = {
        titulo: data.titulo
    };

    const response = await axios.put(baseUrl,body,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}