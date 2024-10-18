import Cookies from 'js-cookie';
import { getConfig } from '../helpers';
import { setConfig } from './setConfig';

export function updateConfig() {
    getConfig()
    .then((newConfig) => {

        setConfig(newConfig)
    
    })
}