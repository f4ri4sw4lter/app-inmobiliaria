/*
TODO: CONSULTA API DE DATOS DEL GOBIERNO ARGENTINO PARA MUNICIPIOS
https://datosgobar.github.io/georef-ar-api/bulk/

*/
import axios from 'axios';
import { User } from '../utils/user';

export const getMunicipioById = async(id) => {

    try{
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?id=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + User.token
            }
        })
        if (response.status === 200 || response.status === 201) {
            const data = response.data;
            console.log(data)
            return data;
        }
    }
    catch(e){
        console.error(e)
    };
}