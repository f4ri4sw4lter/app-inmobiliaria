/*
1 - Super Administrador (Administrador) Todo
2 - Administrador - (Propietario) Metricas, Usuarios, Mensajes.
3 - Empleado - (Alquileres y Ventas) Inmuebles, Contratos, Clientes, Documentos.
4 - Marketing 
*/

import SvgColor from '../../components/svg-color';
import { getConfig } from '../../utils';

const Config = getConfig();

const icon = (name) => (
  <SvgColor src={`/assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const msgIcon = Config.unreadMsgs ? 'flaticon/sobre-mas' : 'flaticon/sobre' 

const navConfig = [
  {
    title: 'Metricas',
    path: '/backoffice',
    icon: icon('flaticon/grafico'),
    roleLevel: [1, 2]
  },
  {
    title: 'Inmuebles',
    path: '/backoffice/inmuebles',
    icon: icon('flaticon/edificio'),
    roleLevel: [1, 3, 4]
  },
  {
    title: 'Contratos',
    path: '/backoffice/contratos/',
    icon: icon('flaticon/monedas'),
    roleLevel: [1, 3]
  },
  {
    title: 'Usuarios',
    path: '/backoffice/users',
    icon: icon('flaticon/usuario'),
    roleLevel: [1, 2]
  }, 
  {
    title: 'Clientes',
    path: '/backoffice/clientes',
    icon: icon('flaticon/usuarios-alt'),
    roleLevel: [1, 3]
  },
  {
    title: 'Mensajes',
    path: '/backoffice/mensajes',
    icon: icon(msgIcon),
    roleLevel: [1, 2, 3]
  },
  {
    title: 'Documentos',
    path: '/backoffice/documentos',
    icon: icon('flaticon/documento'),
    roleLevel: [1, 2, 3]
  },
  {
    title: 'Registros',
    path: '/backoffice/registros',
    icon: icon('flaticon/informacion'),
    roleLevel: [1]
  },
  {
    title: 'Backup',
    path: '/backoffice/backup',
    icon: icon('flaticon/backup'),
    roleLevel: [1]
  },
];

export default navConfig;
