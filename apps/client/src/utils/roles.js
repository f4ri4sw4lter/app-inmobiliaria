/*
1 - Super Administrador (Administrador) Todo
2 - Administrador - (Propietario) Metricas, Usuarios, Mensajes.
3 - Empleado - (Alquileres y Ventas) Inmuebles, Contratos, Clientes, Documentos.
4 - Marketing 
*/

export const roles = [
    {
        name: 'Super Administrador',
        level: '1',
        index: '/'
    },
    {
        name: 'Administrador',
        level: '2',
        index: '/'
    },
    {
        name: 'Empleado',
        level: '3',
        index: 'inmuebles'
    },
    {
        name: 'Marketing',
        level: '4',
        index: 'inmuebles'
    },
];