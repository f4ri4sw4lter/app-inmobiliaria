import axios from 'axios';
import { getUser } from '../utils/user';

export const updateUser = async (data) => {

    const User = getUser();

    data.role = {
        "name": data.roleName,
        "level": data.roleLevel,
    }

    data._id = data.id;

    const baseUrl = `http://localhost:3007/api/auth/update/${data.id}`;

    const response = await axios.put(baseUrl, data, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}