import axios from 'axios';
import { getUser } from '../utils/user';

export const setNewMensaje = async () => {

    const User = getUser();

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        },
    };

    fetch(import.meta.env.VITE_API + 'config/newMessage', requestConfig)
    .then(response => {
        console.log('OK')
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
    });

}