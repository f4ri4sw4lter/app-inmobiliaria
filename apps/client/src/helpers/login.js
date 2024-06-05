
import axios from 'axios';

const baseUrl = 'http://localhost:3007/api/auth/login'

export const login = async credentials => {
    
    const resp = await axios.post(baseUrl,credentials,{
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return resp.data
}