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
    roleLevel: 3
  },
  {
    title: 'Inmuebles',
    path: '/backoffice/inmuebles',
    icon: icon('flaticon/edificio'),
    roleLevel: 3
  },
  {
    title: 'Contratos',
    path: '/backoffice',
    icon: icon('flaticon/monedas'),
    roleLevel: 3
  },
  {
    title: 'Usuarios',
    path: '/backoffice/users',
    icon: icon('flaticon/usuario'),
    roleLevel: 1
  }, 
  {
    title: 'Clientes',
    path: '/backoffice/clientes',
    icon: icon('flaticon/usuarios-alt'),
    roleLevel: 3
  },
  {
    title: 'Mensajes',
    path: '/backoffice/mensajes',
    icon: icon('flaticon/sobre'),
    roleLevel: 3
  },
  {
    title: 'Documentos',
    path: '/backoffice',
    icon: icon('flaticon/documento'),
    roleLevel: 3
  },
  {
    title: 'Registros',
    path: '/backoffice',
    icon: icon('flaticon/informacion'),
    roleLevel: 1
  },
];

export default navConfig;
