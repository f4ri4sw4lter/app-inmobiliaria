import axios from 'axios';
import { getUser } from '../utils/user';

export const createCliente = async( data ) => {

    const User = getUser();

    const apiUrl = 'http://localhost:3007/api/cliente/create';

    const newCliente = {
        "dni": data.dni,
        "nombre": data.nombre,
        "apellido": data.apellido,
        "correo": data.correo,
        "celular": data.celular,
        "telefono": data.telefono,
        "ubicacion":{
            "provincia": data.provincia,
            "municipio": data.municipio,
            "calle": data.calle,
            "altura": data.altura,
        },
        "genero": data.genero,
        "fechaNacimiento": data.fechaNacimiento
    }

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        },
        body: JSON.stringify(newCliente)
    };

    fetch(apiUrl, requestConfig)
    .then(response => {
        console.log('OK')
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });
}