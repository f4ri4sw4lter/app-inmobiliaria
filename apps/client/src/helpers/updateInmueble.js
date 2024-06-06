import axios from 'axios';
import { User } from '../utils/user';

export const updateInmueble = async( data ) => {

    const baseUrl = `/api/propiedad/update/${data.id}`;

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