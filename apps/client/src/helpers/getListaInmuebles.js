import axios from 'axios';

export const getListaInmuebles = async () => {

    try{
        const response = await axios.get('/api/propiedad/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDk2MTE2NGU1ZDk5OTZhMzJlN2ExODMiLCJpYXQiOjE2OTAyNDUyMzQsImV4cCI6MTY5MTEwOTIzNH0.4KM3p9k-lE5GW5ZpPXaoLpTwFliuqfb7W5yXkymTtHM'
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