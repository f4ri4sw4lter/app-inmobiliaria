import axios from 'axios';
import { User } from '../utils/user';

export const updateCliente = async( data ) => {
    console.log(data)
    data.ubicacion = {
        calle: data.calle,
        altura: data.altura,
        municipio: data.municipio,
        provincia: data.provincia,
    }

    const baseUrl = `/api/cliente/update/${data.id}`;
    const response = await axios.put(baseUrl,data,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}