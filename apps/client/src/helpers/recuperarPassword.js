import axios from 'axios';
import { User } from '../utils/user';

export const recuperarPassword = async (data) => {

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:3007/api/mail/recuperarPassword', requestConfig)
    .then((data) => {
        console.log(data)
        return data;
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });

}