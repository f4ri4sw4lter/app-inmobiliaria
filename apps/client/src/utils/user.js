import Cookies from 'js-cookie';

export const User = Cookies.get('User') ? JSON.parse(Cookies.get('User')) : '';
