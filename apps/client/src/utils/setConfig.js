import Cookies from 'js-cookie';

export const setConfig = (newConfig) => {

    Cookies.set('Config', JSON.stringify(newConfig.config[0]), { expires: 1 });

}
