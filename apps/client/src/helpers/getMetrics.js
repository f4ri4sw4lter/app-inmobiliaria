import axios from 'axios';
import { getUser } from '../utils/user';

export const getMetrics = async (user) => {

    const User = getUser();

    if(!user || user == undefined) {user = User};

    try{
        const response = await axios.get(import.meta.env.VITE_API + 'metrics/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + user.token
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