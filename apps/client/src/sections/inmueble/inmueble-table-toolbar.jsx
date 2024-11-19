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

export default function InmuebleTableToolbar({ numSelected, filterName, onFilterName, data }) {

  const fields = [
    { label: 'Título', value: 'titulo' },
    { label: 'Calle', value: 'ubicacion.calle' },
    { label: 'Altura', value: 'ubicacion.altura' },
    { label: 'Municipio', value: 'ubicacion.municipio' },
    { label: 'Provincia', value: 'ubicacion.provincia' },
    { label: 'Cant. Ambientes', value: 'cant_amb' },
    { label: 'Cant. Baños', value: 'cant_ba' },
    { label: 'Cant. Habitaciones', value: 'cant_hab' },
    { label: 'Precio (ARS)', value: 'precio' },
    { label: 'Precio (USD)', value: 'precioUSD' },
    { label: 'Estado', value: 'estado' },
    { label: 'Contrato', value: 'contrato' },
  ];

  const columns = [
    { label: 'Título', value: 'titulo' },
    { label: 'Ubicacion', value: 'ubicacion_inmueble' },
    { label: 'Cant. Amb', value: 'cant_amb' },
    { label: 'Cant. Baños', value: 'cant_ba' },
    { label: 'Cant. Hab', value: 'cant_hab' },
    { label: 'ARS', value: 'precio' },
    { label: 'USD', value: 'precioUSD' },
    { label: 'Estado', value: 'estado' },
    { label: 'Contrato', value: 'contrato' },
  ];

  let dataPDF = data

  dataPDF.map(item => {
    item.ubicacion_inmueble = item.ubicacion.calle + ' ' + item.ubicacion.altura
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
          placeholder="Buscar Inmueble..."
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

      <BotoneraExport filename={'lista_inmuebles'} dataCSV={data} dataPDF={dataPDF} fields={fields} columns={columns}/>

    </Toolbar>
  );
}

InmuebleTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
