import axios from 'axios';

export const deleteInmuebleById = async( id ) => {

    try{
        const response = await axios.delete(`/api/propiedad/delete/${id}`, {
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