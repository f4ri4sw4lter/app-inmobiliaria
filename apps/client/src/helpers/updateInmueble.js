import axios from 'axios';
import { User } from '../utils/user';

export const updateInmueble = async( data ) => {

    const srcMapa = data.mapa.match(/src="([^"]+)"/);
    if(srcMapa){
        data.mapa = String(srcMapa[1]);
    }

    data.ubicacion = {
        calle: data.calle,
        altura: data.altura,
        ciudad: data.ciudad,
        provincia: data.provincia,
        mapa: data.mapa
    }

    const baseUrl = `/api/propiedad/update/${data.id}`;
    const response = await axios.put(baseUrl,data,{
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        }
    })

    return response.data
}