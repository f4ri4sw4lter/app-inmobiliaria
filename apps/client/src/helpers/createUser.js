import axios from 'axios';
import { getUser } from '../utils/user';

export const createUser = async (data) => {

    const User = getUser();

    const apiUrl = import.meta.env.VITE_API + 'auth/register';

    const newUser = {
        "name": data.name,
        "lastname": data.lastname,
        "email": data.email,
        "password": data.password,
        "role": {
            "name": data.roleName,
            "level": data.roleLevel,
        }
    }

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + User.token
        },
        body: JSON.stringify(newUser)
    };

    fetch(apiUrl, requestConfig)
        .then(response => {
            console.log('OK')
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
}