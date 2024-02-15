
import axios from 'axios';

export const getProvincias = async() => {

    try{
        const response = await axios.get('https://apis.datos.gob.ar/georef/api/provincias', {
            headers: {
                'Content-Type': 'application/json',
            }
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