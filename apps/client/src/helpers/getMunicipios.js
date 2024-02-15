
import axios from 'axios';

export const getMunicipios = async(id) => {

    try{
        const response = await axios.get(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${id}&campos=nombre`, {
            headers: {
                'Content-Type': 'application/json',
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