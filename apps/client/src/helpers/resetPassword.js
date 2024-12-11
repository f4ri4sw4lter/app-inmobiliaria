import axios from 'axios';
import { getUser } from '../utils/user';

export const resetPassword = async (data) => {

    const User = getUser();

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