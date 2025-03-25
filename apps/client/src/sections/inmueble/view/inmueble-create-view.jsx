import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, InputLabel, InputBase, Box, FormHelperText, Input, NativeSelect, MenuItem, Switch, InputAdornment } from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageList } from '../img-lista';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createInmueble } from '../../../helpers/createInmueble';
import { useFetchProvincias } from '../../../hooks/useFetchProvincias';
import { useFetchMunicipios } from '../../../hooks/useFetchMunicipios';
import { useFetchListaClientes } from '../../../hooks/useFetchListaClientes';

import { tiposInmuebles } from '../../../utils/tiposInmuebles';

// ----------------------------------------------------------------------

export default function InmuebleCreateView() {

  const { provincias, provinciasIsLoading } = useFetchProvincias();

  const { municipios, municipiosIsLoading, fetchMunicipios } = useFetchMunicipios();

  const { listaClientes, listaClientesIsLoading } = useFetchListaClientes('apellido');

  const navigate = useNavigate();

  const [cliente, setCliente] = useState('');

  const [titulo, setTitulo] = useState('');

  const [contrato, setContrato] = useState('Alquiler');

  const [tipo, setTipo] = useState('');

  const [estado, setEstado] = useState('En Alquiler');

  const [estados, setEstados] = useState('');

  const [precio, setPrecio] = useState('');

  const [precioUSD, setPrecioUSD] = useState('');

  const [ambientes, setAmbientes] = useState(0);

  const [habitaciones, setHabitaciones] = useState(0);

  const [banios, setBanios] = useState(0);

  const [calle, setCalle] = useState('');

  const [altura, setAltura] = useState('');

  const [provincia, setProvincia] = useState('');

  const [mapa, setMapa] = useState('');

  const [descripcion, setDescripcion] = useState('');

  const [municipio, setMunicipio] = useState('');

  const [activo, setActivo] = useState(false);

  const [destacado, setDestacado] = useState(false);

  const [superficie, setSuperficie] = useState(0);

  const [infantes, setInfantes] = useState(false);

  const [mascotas, setMascotas] = useState(false);

  const [cochera, setCochera] = useState(false);

  const handleChangeTitulo = (event) => {
    setTitulo(event.target.value);
  };

  const handleChangeContrato = (event) => {
    setContrato(event.target.value);
    setEstado('Disponible');
  };
  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
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

  const handleChangeActivo = () => {
    setActivo(!activo);
  };

  const handleChangeDestacado = () => {
    setDestacado(!destacado);
  };
  const handleChangeInfantes = () => {
    setInfantes(!infantes);
  };
  const handleChangeMascotas = () => {
    setMascotas(!mascotas);
  };
  const handleChangeCochera = () => {
    setCochera(!cochera);
  };
  const handleChangeSuperficie = (event) => {
    setSuperficie(event.target.value);
  };

  const handleSubmit = (event) => {
    createInmueble({
      propietario: cliente,
      titulo: titulo,
      descripcion: descripcion,
      tipo: tipo,
      cant_amb: Number(ambientes),
      cant_ba: Number(banios),
      cant_hab: Number(habitaciones),
      cochera: cochera,
      mascotas: mascotas,
      infantes: infantes,
      superficie: Number(superficie),
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
      activo: activo,
      destacado: destacado
    });
    navigate('/backoffice/inmuebles');
  }

  useEffect(() => {
    if (contrato == 'Alquiler') {
      setEstados(<>
        <option value={"Disponible"}>Disponible</option>
        <option value={"Alquilado"}>Alquilado</option>
      </>)
    } else {
      setEstados(<>
        <option value={"Disponible"}>Disponible</option>
        <option value={"Vendido"}>Vendido</option>
      </>)
    }
  }, [contrato])

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#1890ff',
          ...theme.applyStyles('dark', {
            backgroundColor: '#177ddc',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,.35)',
      }),
    },
  }));

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
              <>
              <FormHelperText id="cliente-label"> Propietario* </FormHelperText>
              <FormControl>
                <NativeSelect
                  id="cliente"
                  aria-describedby="cliente-helper"
                  onChange={handleChangeCliente}
                  defaultValue={''}
                  key="native-select-1"
                  required
                >
                  <option value="" key="0"> Seleccione un propietario </option>
                  {
                    listaClientes.map(cliente => (
                      <option key={cliente._id} value={cliente._id} >{cliente.apellido + ' ' + cliente.nombre} ({cliente.dni})</option>
                    ))
                  }
                </NativeSelect>
              </FormControl>
              </>
            }
          </Grid>

          <Grid item xs={12} style={{ marginTop: 20 }}>
            <FormHelperText id="titulo-helper"> Ingrese un titulo o nombre para la propiedad* </FormHelperText>
            <FormControl sx={{ width: '50%' }}>
              <Input id="titulo" aria-describedby="titulo-helper" onChange={handleChangeTitulo} required/>
            </FormControl>
          </Grid>

          <Grid item xs={2} style={{ marginTop: 20 }}>
            <FormHelperText id="contrato-label"> Contrato* </FormHelperText>
            <FormControl>
              <NativeSelect
                id="contrato"
                aria-describedby="contrato-helper"
                defaultValue=""
                onChange={handleChangeContrato}
                required
              >
                <option key="" value="" disabled> Seleccione un tipo </option>
                <option value="Alquiler">Alquiler</option>
                <option value="Venta">Venta</option>
              </NativeSelect>
            </FormControl>
          </Grid>

          <Grid item xs={2} style={{ marginTop: 20 }}>
            <FormHelperText id="tipo-label"> Tipo de propiedad* </FormHelperText>
            <FormControl>
              <NativeSelect
                id="tipo"
                aria-describedby="tipo-helper"
                onChange={handleChangeTipo}
                required
                value={tipo}
                
              >
                <option key="" value="" disabled> Seleccione un tipo </option>
                {
                  tiposInmuebles.map((tipo) => (
                    <option key={tipo.name} value={tipo.name}>{tipo.name}</option>
                  ))
                }
              </NativeSelect>
            </FormControl>
          </Grid>

          {/* Precio */}
          <Grid item xs={3} style={{ marginTop: 20 }}>
            <FormHelperText id="precio-helper"> Ingrese el precio en ARS*</FormHelperText>
            <FormControl>
              <Input 
                type="number" 
                id="precio" 
                aria-describedby="precio-helper" 
                onChange={handleChangePrecio}
                required
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
          </Grid>
          <Grid item xs={5} style={{ marginTop: 20 }}>
            <FormHelperText id="precioUSD-helper"> Ingrese el precio en USD* </FormHelperText>
            <FormControl>
              <Input 
                type="number" 
                id="precioUSD" 
                aria-describedby="precioUSD-helper" 
                onChange={handleChangePrecioUSD}
                required
                startAdornment={<InputAdornment position="start">U$S</InputAdornment>}
              />
            </FormControl>
          </Grid>

          <Grid item xs={2} style={{ marginTop: 20, width: '100%' }}>
            <Typography> Infantes* </Typography><br />
            <FormControlLabel
              control={
                <Switch checked={infantes} onChange={handleChangeInfantes} name="infantes" id="infantes" />
              }
              label={infantes ? 'Si' : 'No'}
            />
          </Grid>
          <Grid item xs={2} style={{ marginTop: 20, width: '100%' }}>
            <Typography> Mascotas* </Typography><br />
            <FormControlLabel
              control={
                <Switch checked={mascotas} onChange={handleChangeMascotas} name="mascotas" id="mascotas" />
              }
              label={mascotas ? 'Si' : 'No'}
            />
          </Grid>
          <Grid item xs={8} style={{ marginTop: 20, width: '100%' }}>
            <Typography> Cochera* </Typography><br />
            <FormControlLabel
              control={
                <Switch checked={cochera} onChange={handleChangeCochera} name="cochera" id="cochera" />
              }
              label={cochera ? 'Si' : 'No'}
            />
          </Grid>

          {/* Ambientes */}
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormHelperText id="ambientes-helper"> Ambientes* </FormHelperText>
            <FormControl sx={{ width: '20%' }}>
              <Input type="number" id="ambientes" aria-describedby="ambientes-helper" onChange={handleChangeAmbientes} value={ambientes} required/>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormHelperText id="habitaciones-helper"> Habitaciones* </FormHelperText>
            <FormControl sx={{ width: '20%' }}>
              <Input type="number" id="habitaciones" aria-describedby="habitaciones-helper" onChange={handleChangeHabitaciones} value={habitaciones} required/>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormHelperText id="banios-helper"> Baños* </FormHelperText>
            <FormControl sx={{ width: '20%' }}>
              <Input type="number" id="banios" aria-describedby="banios-helper" onChange={handleChangeBanios} value={banios} required/>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{ marginTop: 30 }}>
            <FormHelperText id="superficie-helper"> Superficie en m2*</FormHelperText>
            <FormControl sx={{ width: '60%' }}>
              <Input type="number" id="superficie" aria-describedby="superficie-helper" onChange={handleChangeSuperficie} value={superficie} required/>
            </FormControl>
          </Grid>

          {/* Ubicacion */}
          <Grid item xs={4} style={{ marginTop: 30 }}>
            <FormHelperText id="calle-helper"> Calle* </FormHelperText>
            <FormControl sx={{ width: '90%' }}>
              <Input id="calle" aria-describedby="calle-helper" multiline onChange={handleChangeCalle} required/>
            </FormControl>
          </Grid>
          <Grid item xs={2} style={{ marginTop: 30 }}>
            <FormHelperText id="altura-helper"> Altura* </FormHelperText>
            <FormControl sx={{ width: '90%' }}>
              <Input type="number" id="altura" aria-describedby="altura-helper" onChange={handleChangeAltura} required/>
            </FormControl>
          </Grid>
          <Grid item xs={3} style={{ marginTop: 30 }}>
            {provinciasIsLoading == false &&
              <>
              <FormHelperText id="provincia-label">Provincia*</FormHelperText>
              <FormControl sx={{ width: '90%' }}>
                <NativeSelect
                  id="provincia"
                  aria-describedby="provincia-helper"
                  value={provincia}
                  onChange={handleChangeProvincia}
                  default = ""
                  required
                >
                  <option key="" value="" disabled> Seleccione una provincia </option>
                  {
                    provincias.map(provincia => (
                      <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                    ))
                  }
                </NativeSelect>
              </FormControl>
              </>
            }
          </Grid>
          <Grid item xs={3} style={{ marginTop: 30 }}>
            {municipiosIsLoading == false &&
              <>
              <FormHelperText id="municipio-label"> Localidad* </FormHelperText>
              <FormControl sx={{ width: '90%' }}>
                <NativeSelect
                  id="municipio"
                  aria-describedby="municipio-helper"
                  onChange={handleChangeMunicipio}
                  default=""
                  required
                  value={municipio}
                >
                  <option key="" value="" disabled> Seleccione una localidad </option>
                  {
                    municipios.map(municipio => (
                      <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>
                    ))
                  }
                </NativeSelect>
              </FormControl>
              </>
            }
          </Grid>

          <Grid item xs={6} style={{ width: '100%', marginTop: 30 }}>
            <FormHelperText id="mapa-helper"> Mapa </FormHelperText>
            <FormControl style={{ width: '100%' }}>
              <Input type="text" id="mapa" aria-describedby="mapa-helper" value={mapa} onChange={handleChangeMapa} />
            </FormControl>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 20, width: '100%' }}>
            <FormHelperText id="descripcion-helper"> Ingrese la descripcion </FormHelperText>
            <FormControl style={{ width: '100%' }}>
              <Input type="number" id="descripcion" aria-describedby="descripcion-helper" multiline fullWidth={true} onChange={handleChangeDescripcion} />
            </FormControl>
          </Grid>

          <Grid item xs={6} style={{ marginTop: 20, width: '100%' }}>
            <Typography>Activo</Typography><br />
            <FormControlLabel
              control={
                <Switch checked={activo} onChange={handleChangeActivo} name="activo" id="activo" />
              }
              label={activo ? 'Si' : 'No'}
            />
          </Grid>

          <Grid item xs={6} style={{ marginTop: 20, width: '100%' }}>
            <Typography>Destacado</Typography><br />
            <FormControlLabel
              control={
                <Switch checked={destacado} onChange={handleChangeDestacado} name="destacado" id="destacado" />
              }
              label={destacado ? 'Si' : 'No'}
            />
          </Grid>

        </Grid>
      </form>
    </Container>
  );
}
