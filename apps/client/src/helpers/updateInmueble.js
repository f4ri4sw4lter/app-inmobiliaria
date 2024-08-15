import axios from 'axios';
import { User } from '../utils/user';

export const updateInmueble = async( data ) => {

    console.log(data)
    console.log(data.mapa)
    if(data.mapa){
        console.log("ACA")
        const srcMapa = data.mapa.match(/src="([^"]+)"/);
        if(srcMapa){
            data.mapa = String(srcMapa[1]);
        }
    }
    if(data.calle){
        console.log("ACA2")
        data.ubicacion = {
            calle: data.calle,
            altura: data.altura,
            municipio: data.municipio,
            provincia: data.provincia,
            mapa: data.mapa
        }
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