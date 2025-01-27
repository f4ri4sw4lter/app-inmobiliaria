import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from '../../components/iconify';
import BotoneraExport from '../../components/botonera-export/botonera-export';

// ----------------------------------------------------------------------

export default function ContratoTableToolbar({ numSelected, filterName, onFilterName, data }) {

  const fields = [
    { label: 'Inmueble', value: 'inmueble.titulo' },
    { label: 'Propietario', value: 'propietario.apellido' },
    { label: ' ', value: 'propietario.nombre' },
    { label: 'Cliente', value: 'cliente.apellido' },
    { label: ' ', value: 'cliente.nombre' },
    { label: 'Empleado', value: 'empleado' },
    { label: 'Detalle', value: 'detalle' },
    { label: 'Fecha', value: 'fecha' },
  ];

  const columns = [
    { label: 'Inmueble', value: 'titulo_inmueble' },
    { label: 'Propietario', value: 'nombre_propietario' },
    { label: 'Cliente', value: 'nombre_cliente' },
    { label: 'Empleado', value: 'empleado' },
    { label: 'Detalle', value: 'detalle' },
    { label: 'Fecha', value: 'fecha' },
  ];

  let dataPDF = data

  dataPDF.map(item => {
    item.titulo_inmueble = item.inmueble.titulo
    item.nombre_propietario = item.propietario.apellido + ' ' + item.propietario.nombre;
    item.nombre_cliente = item.cliente.apellido + ' ' + item.cliente.nombre;
  })

  return (
    <>

      <BotoneraExport filename={'lista_contratos'} dataCSV={data} dataPDF={dataPDF} fields={fields} columns={columns} />

    </>
  );
}

ContratoTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
