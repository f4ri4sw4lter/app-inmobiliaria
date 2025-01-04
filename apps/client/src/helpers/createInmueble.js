import axios from 'axios';
import { getUser } from '../utils/user';

export const createInmueble = async( data ) => {

    console.log(data)

    const User = getUser();

    const apiUrl = import.meta.env.VITE_API + 'propiedad/create';
    const srcMapa = data.mapa.match(/src="([^"]+)"/);
    if(srcMapa){
        data.mapa = String(srcMapa[1]);
    }

    const newInmueble = {
        "propietario": data.propietario,
        "titulo": data.titulo,
        "descripcion": data.descripcion,
        "tipo": data.tipo,
        "cant_amb": data.cant_amb,
        "cant_ba": data.cant_ba,
        "cant_hab": data.cant_hab,
        "precio": data.precio,
        "precioUSD": data.precioUSD,
        "imagenes": null,
        "ubicacion":{
            "provincia": data.provincia,
            "municipio": data.municipio,
            "calle": data.calle,
            "altura": data.altura,
            "mapa": data.mapa
        },
        "equipamientos": "",
        "estado": data.estado,
        "cliente": 0,
        "contrato": data.contrato,
        "activo": data.activo,
        "destacado": data.destacado
    }

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        },
        body: JSON.stringify(newInmueble)
    };

    fetch(apiUrl, requestConfig)
    .then(response => {
        console.log('OK')
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}