import axios from 'axios';
import { getUser } from '../utils/user';

export const getContratoById = async( id ) => {

    const User = getUser();

    try{
        const response = await axios.get(`${import.meta.env.VITE_API}contrato/${id}`, {
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