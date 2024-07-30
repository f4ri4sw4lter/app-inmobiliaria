import axios from 'axios';
import { User } from '../utils/user';

export const getListaContratos = async ( id ) => {


    const path = '/api/contrato/' + (id==undefined?'':id);

    try{
        const response = await axios.get(path, {
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