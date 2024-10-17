import axios from 'axios';
import { User } from '../utils/user';

export const recuperarPassword = async (data) => {

    const urlApi = 'http://localhost:3007/api/auth/initReset';

    const options = {
        method: 'PATCH',
        url: urlApi,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data)
    };

    return await axios.request(options);

}