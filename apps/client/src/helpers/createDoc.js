import axios from 'axios';
import { User } from '../utils/user';

export const createDoc = async (reference, ownerId, name, data, setIsUpload) => {

    const urlApi =  `/api/documento`

    const form = new FormData();
    form.append("file", data);
    form.append("reference", reference);
    form.append("ownerId", ownerId);
    form.append("name", name);

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