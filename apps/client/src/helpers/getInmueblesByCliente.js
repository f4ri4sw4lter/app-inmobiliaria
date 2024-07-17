import axios from 'axios';
import { User } from '../utils/user';

export const getInmueblesByCliente = async( id ) => {

    try{
        const response = await axios.get(`/api/propiedad/cliente/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + User.token
            }
        })
        if (response.status === 200 || response.status === 201) {
            const data = response.data;
            console.log(data)
            return data;
        }
    }
    catch(e){
        console.error(e)
    };
}