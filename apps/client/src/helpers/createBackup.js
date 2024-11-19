import axios from 'axios';
import { getUser } from '../utils/user';

export const createBackup = async (setCreatingBackup, setBackupCreated) => {

    const User = getUser();

    const urlApi =  `http://localhost:3007/api/config/createBackup`

    const options = {
        method: 'POST',
        url: urlApi,
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: 'Bearer ' + User.token
        }
    };

    axios.request(options)
    .then(function () {
        setCreatingBackup(false)
        setBackupCreated({status: 'created'})
    }).catch(function () {
        setCreatingBackup(false)
        setBackupCreated({status: 'error'})
    });
}