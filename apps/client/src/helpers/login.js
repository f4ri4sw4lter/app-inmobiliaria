
import axios from 'axios';

const baseUrl = 'http://' + import.meta.env.VITE_API + ':3007/api/auth/login'

export const login = async credentials => {

    try{
        const resp = await axios.post(baseUrl,credentials,{
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(resp.status === 200 || resp.status === 201){
            const data = resp.data
            return data
        } 
    }
    catch(e){
        return {status: 401, error: 'Credenciales incorrectas'}
    }
}