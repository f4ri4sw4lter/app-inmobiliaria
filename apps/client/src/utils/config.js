import Cookies from 'js-cookie';

export const getConfig = () => {

    return Cookies.get('Config') ? JSON.parse(Cookies.get('Config')) : '';

}
