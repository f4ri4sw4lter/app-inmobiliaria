import axios from 'axios';
import { getUser } from '../utils/user';

export const updateInmueble = async( data ) => {

    const User = getUser();

    if(data.mapa){
        const srcMapa = data.mapa.match(/src="([^"]+)"/);
        if(srcMapa){
            data.mapa = String(srcMapa[1]);
        }
    }
    if(data.calle){
        data.ubicacion = {
            calle: data.calle,
            altura: data.altura,
            municipio: data.municipio,
            provincia: data.provincia,
            mapa: data.mapa
        }
    }

    const baseUrl = `http://localhost:3007/api/propiedad/update/${data.id}`;
    const response = await axios.put(baseUrl,data,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}