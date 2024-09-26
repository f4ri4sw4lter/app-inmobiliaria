import axios from 'axios';
import { User } from '../utils/user';

export const setNewMensaje = async () => {

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        },
    };

    fetch('http://localhost:3007/api/config/newMessage', requestConfig)
    .then(response => {
        console.log('OK')
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });

}