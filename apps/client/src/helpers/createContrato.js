import axios from 'axios';
import { getUser } from '../utils/user';

export const createContrato = async( data ) => {

    const User = getUser();

    const apiUrl = 'http://localhost:3007/api/contrato';

    const newInmueble = {
        "inmueble": data.inmueble,
        "propietario": data.propietario,
        "cliente": data.cliente,
        "empleado": User.lastname + ' ' + User.name,
        "detalle": data.detalle,
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