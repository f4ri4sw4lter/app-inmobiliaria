import axios from 'axios';
import { User } from '../utils/user';

export const getConfig = async (user) => {

    if(!user || user == undefined) {user = User};

    try{
        const response = await axios.get('/api/config/', {
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