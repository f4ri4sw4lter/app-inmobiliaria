
import axios from 'axios';
const User = JSON.parse(localStorage.getItem('User'));

export const getMunicipios = async(id) => {

    try{
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=nombre`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + User.token
            }
        })
        if (response.status === 200 || response.status === 201) {
            const data = response.data;
            console.log(data);
            return data;
        }
    }
    catch(e){
        console.error(e)
    };
}