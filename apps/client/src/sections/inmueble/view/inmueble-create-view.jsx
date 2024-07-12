import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, InputLabel, Box, FormHelperText, Input, NativeSelect, MenuItem } from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageList } from '../img-lista';

import { createInmueble } from '../../../helpers/createInmueble';
import { useFetchProvincias } from '../../../hooks/useFetchProvincias';
import { useFetchMunicipios } from '../../../hooks/useFetchMunicipios';
import { useFetchListaClientes } from '../../../hooks/useFetchListaClientes';

// ----------------------------------------------------------------------

export default function InmuebleCreateView() {

  const { provincias, provinciasIsLoading } = useFetchProvincias();

  const { municipios, municipiosIsLoading, fetchMunicipios } = useFetchMunicipios(2);

  const { listaClientes, listaClientesIsLoading } = useFetchListaClientes();

  const navigate = useNavigate();

  const [cliente, setCliente] = useState('');

  const [titulo, setTitulo] = useState('');

  const [contrato, setContrato] = useState('Alquiler');

  const [estado, setEstado] = useState('En Alquiler');

  const [estados, setEstados] = useState('');

  const [precio, setPrecio] = useState('');

  const [precioUSD, setPrecioUSD] = useState('');

  const [ambientes, setAmbientes] = useState('');

  const [habitaciones, setHabitaciones] = useState('');

  const [banios, setBanios] = useState('');

  const [calle, setCalle] = useState('');

  const [altura, setAltura] = useState('');

  const [provincia, setProvincia] = useState('');

  const [mapa, setMapa] = useState('');

  const [descripcion, setDescripcion] = useState('');

  const [municipio, setMunicipio] = useState('');


  const handleChangeTitulo = (event) => {
    setTitulo(event.target.value);
  };

  const handleChangeContrato = (event) => {
    setContrato(event.target.value);
  };
  const handleChangeEstado = (event) => {
    setEstado(event.target.value);
  };

  const handleChangePrecio = (event) => {
    setPrecio(event.target.value);
  };
  const handleChangePrecioUSD = (event) => {
    setPrecioUSD(event.target.value);
  };

  // UBICACION
  const handleChangeCalle = (event) => {
    setCalle(event.target.value);
  };
  const handleChangeAltura = (event) => {
    const { value } = event.target;
    const new_value = value.replace(/[a-zA-Z]/g, '');
    if (typeof new_value != 'undefined') {
      setAltura(new_value);
    }
  };

  const handleChangeProvincia = (event) => {
    setProvincia(event.target.value);
    fetchMunicipios(event.target.value);
  };

  const handleChangeMunicipio = (event) => {
    setMunicipio(event.target.value);
  };

  const handleChangeMapa = (event) => {
    setMapa(event.target.value);
  };

  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };
  const handleChangeAmbientes = (event) => {
    setAmbientes(event.target.value);
  };
  const handleChangeHabitaciones = (event) => {
    setHabitaciones(event.target.value);
  };
  const handleChangeBanios = (event) => {
    setBanios(event.target.value);
  };

  const handleChangeCliente = (event) => {
    setCliente(event.target.value);
  };

  const handleSubmit = (event) => {
    createInmueble({
      propietario: cliente,
      titulo: titulo,
      descripcion: descripcion,
      tipo: '-',
      cant_amb: Number(ambientes),
      cant_ba: Number(banios),
      cant_hab: Number(habitaciones),
      precio: Number(precio),
      precioUSD: Number(precioUSD),
      contrato: contrato,
      estado: estado,
      calle: calle,
      altura: Number(altura),
      provincia: provincia,
      municipio: municipio,
      mapa: mapa,
      equipamiento: '',
    });
    navigate('/backoffice/inmuebles');
  }

  useEffect(() => {
    if (contrato == 'Alquiler') {
      setEstados(<>
        <option value={"En Alquiler"}>En Alquiler</option>
        <option value={"Alquilado"}>Alquilado</option>
      </>)
    } else {
      setEstados(<>
        <option value={"En venta"}>En venta</option>
        <option value={"Vendido"}>Vendido</option>
      </>)
    }
  }, [contrato])



  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Crear inmueble</Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Button type="submit" variant="contained" color="inherit" startIcon={<Iconify icon="eva:save-fill" />}>
              Guardar
            </Button>
            <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:close-fill" />} sx={{ ml: 1 }} href="/backoffice/inmuebles">
              Cancelar
            </Button>
          </Stack>
        </Stack>

        <Grid container>
          <Grid item xs={12} style={{ marginTop: 0 }}>
            {listaClientesIsLoading == false &&
              <FormControl>
                <NativeSelect
                  id="cliente"
                  aria-describedby="cliente-helper"
                  onChange={handleChangeCliente}
                  defaultValue={''}
                  key="native-select-1"
                >
                  <option value="" key="0">Seleccione un propietario</option>
                  {
                    listaClientes.map(cliente => (
                      <option key="{cliente._id}" value="{cliente._id}" >{cliente.apellido + ' ' + cliente.nombre} ({cliente.dni})</option>
                    ))
                  }
                </NativeSelect>
                <FormHelperText id="cliente-label"> Propietario </FormHelperText>
              </FormControl>
            }
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={{ width: '50%' }}>
              <Input id="titulo" aria-describedby="titulo-helper" onChange={handleChangeTitulo} />
              <FormHelperText id="titulo-helper"> Ingrese el titulo </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={3} style={{ marginTop: 20 }}>
            <FormControl>
              <NativeSelect
                id="contrato"
                aria-describedby="titulo-helper"
                defaultValue="Alquiler"
                onChange={handleChangeContrato}
              >
                <option value="Alquiler">Alquiler</option>
                <option value="Venta">Venta</option>
              </NativeSelect>
              <FormHelperText id="contrato-label">Seleccione un tipo de contrato</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={9} style={{ marginTop: 20 }}>
            <FormControl>
              <NativeSelect
                id="estado"
                aria-describedby="titulo-helper"
                defaultValue="En Alquiler"
                onChange={handleChangeEstado}
              >
                {estados}
              </NativeSelect>
              <FormHelperText id="estado-label">Seleccione el estado del inmueble</FormHelperText>
            </FormControl>
          </Grid>

          {/* Precio */}
          <Grid item xs={3} style={{ marginTop: 20 }}>
            $
            <FormControl>
              <Input id="precio" aria-describedby="precio-helper" onChange={handleChangePrecio} />
              <FormHelperText id="precio-helper"> Ingrese el precio en ARS</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={9} style={{ marginTop: 20 }}>
            $
            <FormControl>
              <Input type="number" id="precioUSD" aria-describedby="precioUSD-helper" onChange={handleChangePrecioUSD} />
              <FormHelperText id="precioUSD-helper"> Ingrese el precio en USD </FormHelperText>
            </FormControl>
          </Grid>

          {/* Ambientes */}
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormControl sx={{ width: '60%' }}>
              <Input type="number" id="ambientes" aria-describedby="ambientes-helper" multiline onChange={handleChangeAmbientes} />
              <FormHelperText id="ambientes-helper"> Ambientes </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormControl sx={{ width: '60%' }}>
              <Input type="number" id="habitaciones" aria-describedby="habitaciones-helper" multiline onChange={handleChangeHabitaciones} />
              <FormHelperText id="habitaciones-helper"> Habitaciones </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormControl sx={{ width: '60%' }}>
              <Input type="number" id="banios" aria-describedby="banios-helper" multiline onChange={handleChangeBanios} />
              <FormHelperText id="banios-helper"> Baños </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }}></Grid>

          {/* Ubicacion */}
          <Grid item xs={4} style={{ marginTop: 30 }}>
            <FormControl sx={{ width: '90%' }}>
              <Input id="calle" aria-describedby="calle-helper" multiline onChange={handleChangeCalle} />
              <FormHelperText id="calle-helper"> Calle </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormControl sx={{ width: '90%' }}>
              <Input type="number" id="altura" aria-describedby="altura-helper" onChange={handleChangeAltura} />
              <FormHelperText id="altura-helper"> Altura </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3} style={{ marginTop: 30 }}>
            {provinciasIsLoading == false &&
              <FormControl sx={{ width: '90%' }}>
                <NativeSelect
                  id="provincia"
                  aria-describedby="provincia-helper"
                  value={provincia}
                  onChange={handleChangeProvincia}
                >
                  {
                    provincias.map(provincia => (
                      <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                    ))
                  }
                </NativeSelect>
                <FormHelperText id="provincia-label">Provincia</FormHelperText>
              </FormControl>
            }
          </Grid>
          <Grid item xs={3} style={{ marginTop: 30 }}>
            {municipiosIsLoading == false &&
              <FormControl sx={{ width: '90%' }}>
                <NativeSelect
                  id="municipio"
                  aria-describedby="municipio-helper"
                  onChange={handleChangeMunicipio}
                >
                  {
                    municipios.map(municipio => (
                      <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>
                    ))
                  }
                </NativeSelect>
                <FormHelperText id="municipio-label"> Localidad </FormHelperText>
              </FormControl>
            }
          </Grid>

          <Grid item xs={6} style={{ width: '100%' }}>
            <FormControl style={{ marginTop: 30, width: '100%' }}>
              <Input type="text" id="mapa" aria-describedby="mapa-helper" value={mapa} onChange={handleChangeMapa} />
              <FormHelperText id="mapa-helper"> Mapa </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 20, width: '100%' }}>
            <FormControl style={{ width: '100%' }}>
              <Input type="number" id="descripcion" aria-describedby="descripcion-helper" multiline fullWidth={true} onChange={handleChangeDescripcion} />
              <FormHelperText id="descripcion-helper"> Ingrese la descripcion </FormHelperText>
            </FormControl>
          </Grid>


        </Grid>
      </form>
    </Container>
  );
}
