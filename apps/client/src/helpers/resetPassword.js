import axios from 'axios';
import { User } from '../utils/user';

export const resetPassword = async (data) => {

    const urlApi = 'http://localhost:3007/api/auth/validateReset';

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