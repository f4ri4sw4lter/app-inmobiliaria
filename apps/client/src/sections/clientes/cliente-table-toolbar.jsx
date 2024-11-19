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

export default function ClienteTableToolbar({ numSelected, filterName, onFilterName, data }) {

  const fields = [
    { label: 'DNI', value: 'dni' },
    { label: 'Apellido', value: 'apellido' },
    { label: 'Nombre', value: 'nombre' },
    { label: 'correo', value: 'correo' },
    { label: 'Celular', value: 'celular' },
    { label: 'Telefono', value: 'telefono' },
    { label: 'Calle', value: 'ubicacion.calle' },
    { label: 'Altura', value: 'ubicacion.altura' },
  ];

  const columns = [
    { label: 'DNI', value: 'dni' },
    { label: 'Nombre completo', value: 'nombre_completo' },
    { label: 'Correo', value: 'correo' },
    { label: 'Celular', value: 'celular' },
    { label: 'Telefono', value: 'telefono' },
    { label: 'Ubicacion', value: 'ubicacion_cliente' },
  ];

  let dataPDF = data

  dataPDF.map(item => {
    item.nombre_completo = item.apellido + ' ' + item.nombre;
    item.ubicacion_cliente = item.ubicacion.calle + ' ' + item.ubicacion.altura;
  })

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} seleccionado{numSelected > 1 && 's'}
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar cliente..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      <BotoneraExport filename={'lista_clientes'} dataCSV={data} dataPDF={dataPDF} fields={fields} columns={columns} />

    </Toolbar>
  );
}

ClienteTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
