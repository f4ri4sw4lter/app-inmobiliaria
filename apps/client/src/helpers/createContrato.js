import axios from 'axios';
import { User } from '../utils/user';

export const createContrato = async( data ) => {

    console.log(data)

    const apiUrl = '/api/contrato';

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