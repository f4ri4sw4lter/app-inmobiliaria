import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Inicio',
    path: '/backoffice',
    icon: icon('flaticon/grafico'),
  },
  {
    title: 'Inmuebles',
    path: '/backoffice/inmuebles',
    icon: icon('flaticon/edificio'),
  },
  {
    title: 'Contratos',
    path: '/backoffice',
    icon: icon('flaticon/monedas'),
  },
  {
    title: 'Usuarios',
    path: '/backoffice/users',
    icon: icon('flaticon/usuario'),
  }, 
  {
    title: 'Clientes',
    path: '/backoffice/clientes',
    icon: icon('flaticon/usuarios-alt'),
  },
  {
    title: 'Documentos',
    path: '/backoffice',
    icon: icon('flaticon/documento'),
  },
];

export default navConfig;
