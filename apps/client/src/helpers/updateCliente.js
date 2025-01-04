import axios from 'axios';
import { getUser } from '../utils/user';

export const updateCliente = async( data ) => {

    const User = getUser();

    data.ubicacion = {
        calle: data.calle,
        altura: data.altura,
        municipio: data.municipio,
        provincia: data.provincia,
    }

    const baseUrl = `${import.meta.env.VITE_API}cliente/update/${data.id}`;
    const response = await axios.put(baseUrl,data,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}