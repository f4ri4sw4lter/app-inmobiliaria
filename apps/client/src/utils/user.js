import Cookies from 'js-cookie';

export const getUser = () => {

    return Cookies.get('User') ? JSON.parse(Cookies.get('User')) : '';

}
