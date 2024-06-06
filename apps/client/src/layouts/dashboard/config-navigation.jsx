import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Inicio',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Inmuebles',
    path: '/inmuebles',
    icon: icon('ic_cart'),
  },
  {
    title: 'Usuarios',
    path: '/users',
    icon: icon('ic_user'),
  }, 
  {
    title: 'Clientes',
    path: '/clientes',
    icon: icon('ic_user'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
