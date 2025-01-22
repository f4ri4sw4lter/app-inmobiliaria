import PropTypes from 'prop-types';
import BotoneraExport from '../../components/botonera-export/botonera-export';

// ----------------------------------------------------------------------

export default function InmuebleTableToolbar({ data }) {



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
    <>
      <BotoneraExport filename={'lista_inmuebles'} dataCSV={data} dataPDF={dataPDF} fields={fields} columns={columns} />
    </>
  );
}

InmuebleTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
