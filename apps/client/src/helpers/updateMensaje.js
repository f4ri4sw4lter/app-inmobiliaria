import axios from 'axios';
import { getUser } from '../utils/user';

export const updateMensaje = async (data) => {

    const User = getUser();

    const baseUrl = `${import.meta.env.VITE_API}mensaje/${data.id}`;

    if(data.noLeido == 'true') {
        data.noLeido = false;
        data.lector = User.lastname + " " + User.name;
    } else {
        data.noLeido = true;
        data.lector = '';
    }

    const response = await axios.put(baseUrl, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}