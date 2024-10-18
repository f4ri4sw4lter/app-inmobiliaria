
import axios from 'axios';
import { getUser } from '../utils/user';

export const getProvincias = async() => {

    const User = getUser();

    try{
        const response = await axios.get('https://apis.datos.gob.ar/georef/api/provincias?orden=nombre', {
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