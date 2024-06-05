import axios from 'axios';
const User = JSON.parse(localStorage.getItem('User'))

export const getListaImagesById = async ( id ) => {
    try{
        const response = await axios.get(`/api/images/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + User.token
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