import Cookies from 'js-cookie';
import { getConfig } from '../helpers';

export function updateConfig() {
    getConfig()
    .then((newConfig) => {
        console.log(newConfig)
        Cookies.set('Config', JSON.stringify(newConfig.config[0]), { expires: 1 })
    
    })
}