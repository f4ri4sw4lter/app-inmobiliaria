import axios from 'axios';
import { User } from '../utils/user';

export const updateMensaje = async (data) => {

    const baseUrl = `/api/mensaje/${data.id}`;

    if(data.noLeido == 'true') {
        data.noLeido = false;
        data.lector = User.lastname + " " + User.name;
        console.log('1')
    } else {
        data.noLeido = true;
        data.lector = '';
        console.log('2')
    }
    console.log(data)

    const response = await axios.put(baseUrl, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}