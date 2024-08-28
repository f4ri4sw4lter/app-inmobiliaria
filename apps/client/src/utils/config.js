import Cookies from 'js-cookie';

export const Config = Cookies.get('Config') ? JSON.parse(Cookies.get('Config')) : '';