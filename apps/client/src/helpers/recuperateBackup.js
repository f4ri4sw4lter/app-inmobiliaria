import axios from 'axios';
import { getUser } from '../utils/user';

export const recuperateBackup = async (setRecuperatingBackup, setBackupRecuperated) => {

    const User = getUser();

    const urlApi =  `http://localhost:3007/api/config/recuperateBackup`

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
        setRecuperatingBackup(false)
        setBackupRecuperated({status: 'recuperated'})
    }).catch(function () {
        setRecuperatingBackup(false)
        setBackupRecuperated({status: 'error'})
    });
}