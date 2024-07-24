import axios from 'axios';
import { User } from '../utils/user';

export const createDoc = async (owner, data, reference, setIsUpload) => {

    const urlApi =  `/api/documento/${owner}/${reference}`

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