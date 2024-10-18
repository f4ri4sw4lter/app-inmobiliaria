/*
TODO: CONSULTA API DE DATOS DEL GOBIERNO ARGENTINO PARA MUNICIPIOS
https://datosgobar.github.io/georef-ar-api/bulk/

*/
import axios from 'axios';
import { getUser } from '../utils/user';

export const getMunicipios = async(id) => {

    const User = getUser();

    try{
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=nombre&max=200&orden=nombre`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + User.token
            },
        })
        if (response.status === 200 || response.status === 201) {
            const data = response.data;
            return data;
        }
    }
    catch(e){
        console.error(e)
    };
}