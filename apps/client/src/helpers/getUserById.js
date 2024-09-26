import axios from 'axios';
import { User } from '../utils/user';

export const getUserById = async( id ) => {

    try{
        const response = await axios.get(`http://localhost:3007/api/auth/userById/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + User.token
            }
        })
        if (response.status === 200 || response.status === 201) {
            const data = response.data;
            return data;
        }
    }
    catch(e){
        console.error(e)
    };
}