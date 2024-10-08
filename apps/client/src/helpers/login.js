
import axios from 'axios';

const baseUrl = 'http://localhost:3007/api/auth/login'

export const login = async credentials => {

    console.log(credentials)

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