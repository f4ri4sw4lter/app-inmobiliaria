import axios from 'axios';
import { getUser } from '../utils/user';

export const createImage = async (reference, data, id, setIsUpload) => {

    const User = getUser();

    const urlApi =  `http://localhost:3007/api/images/upload/${reference}/${id}`

    const form = new FormData();
    form.append("file", data);

    const options = {
        method: 'POST',
        url: urlApi,
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: 'Bearer ' + User.token
        },
        data: form
    };

    axios.request(options)
    .then(function (response) {
        setIsUpload(true)
        return {status: 'OK'};
    }).catch(function (error) {
        return {status: 'Error'};
    });
}