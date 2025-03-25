import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ModalUploadImg } from '../modal-upload-img';
import FormControlLabel from '@mui/material/FormControlLabel';

import { Stack, Button, Container, Typography, Grid, FormControl, InputLabel, Box, FormHelperText, Input, NativeSelect, MenuItem, Switch, InputAdornment } from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

import { useFetchInmuebleById } from '../../../hooks/useFetchInmueblesById';
import { updateInmueble } from '../../../helpers/updateInmueble';
import { useFetchListaImages } from '../../../hooks/useFetchListaImages';
import { EditImgGrid } from '../edit-img-grid';
import { useFetchMunicipios } from '../../../hooks/useFetchMunicipios';
import { useFetchProvincias } from '../../../hooks/useFetchProvincias';
import { useFetchListaClientes } from '../../../hooks/useFetchListaClientes';

// ----------------------------------------------------------------------

export default function InmuebleEditView() {

  const navigate = useNavigate();

  const { accion, id } = useParams();

  const { inmueble, isLoading } = useFetchInmuebleById({ id });

  const { provincias, provinciasIsLoading } = useFetchProvincias();

  const { municipios, municipiosIsLoading, fetchMunicipios } = useFetchMunicipios(2);

  const { listaClientes, listaClientesIsLoading } = useFetchListaClientes('apellido');

  const [cliente, setCliente] = useState('');

  const [titulo, setTitulo] = useState('');

  const [contrato, setContrato] = useState('');

  const [estado, setEstado] = useState('');

  const [estados, setEstados] = useState('');

  const [precio, setPrecio] = useState('');

  const [precioUSD, setPrecioUSD] = useState('');

  const [ambientes, setAmbientes] = useState('');

  const [habitaciones, setHabitaciones] = useState('');

  const [banios, setBanios] = useState('');

  const [calle, setCalle] = useState('');

  const [altura, setAltura] = useState('');

  const [municipio, setMunicipio] = useState('');

  const [provincia, setProvincia] = useState('');

  const [mapa, setMapa] = useState('');

  const [descripcion, setDescripcion] = useState('');

  const [activo, setActivo] = useState();

  const [destacado, setDestacado] = useState();

  const [superficie, setSuperficie] = useState(0);

  const [infantes, setInfantes] = useState(false);

  const [mascotas, setMascotas] = useState(false);

  const [cochera, setCochera] = useState(false);

  const handleChangeCliente = (event) => {
    setCliente(event.target.value);
  };
  const handleChangeTitulo = (event) => {
    setTitulo(event.target.value);
  };
  const handleChangeSelect = (event) => {
    setContrato(event.target.value);
  };
  const handleChangePrecio = (event) => {
    setPrecio(event.target.value);
  };
  const handleChangePrecioUSD = (event) => {
    setPrecioUSD(event.target.value);
  };
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
  const handleChangeMunicipio = (event) => {
    setMunicipio(event.target.value);
  };
  const handleChangeProvincia = (event) => {
    setProvincia(event.target.value);
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
    updateInmueble({
      id: id,
      propietario: cliente,
      titulo: titulo,
      contrato: contrato,
      estado: estado,
      precio: precio,
      precioUSD: precioUSD,
      calle: calle,
      altura: altura,
      municipio: municipio,
      provincia: provincia,
      mapa: mapa,
      descripcion: descripcion,
      cant_amb: ambientes,
      cant_ba: banios,
      cant_hab: habitaciones,
      equipamiento: '',
      cliente: 0,
      activo: activo,
      destacado: destacado,
      infantes: infantes,
      mascotas: mascotas,
      cochera: cochera,
      superficie: superficie
    });
    navigate(`/backoffice/inmuebles/ver/${id}`);
  }

  useEffect(() => {
    if (!isLoading) {
      setTitulo(inmueble.titulo);
      setContrato(inmueble.contrato);
      setEstado(inmueble.estado);
      setPrecio(inmueble.precio);
      setPrecioUSD(inmueble.precioUSD);
      setAmbientes(inmueble.cant_amb);
      setBanios(inmueble.cant_ba);
      setHabitaciones(inmueble.cant_hab);
      setCalle(inmueble.ubicacion['calle']);
      setAltura(parseInt(inmueble.ubicacion['altura'], 10));
      setMunicipio(inmueble.ubicacion['municipio']);
      setProvincia(inmueble.ubicacion['provincia']);
      setDescripcion(inmueble.descripcion);
      setMapa(inmueble.ubicacion['mapa']);
      setCliente(inmueble.propietario);
      fetchMunicipios(inmueble.ubicacion['provincia']);
      setActivo(inmueble.activo);
      setDestacado(inmueble.destacado);
      setInfantes(inmueble.infantes);
      setMascotas(inmueble.mascotas);
      setCochera(inmueble.cochera);
      setSuperficie(inmueble.superficie);
    }
  }, [isLoading])

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



  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" >Editar inmueble</Typography>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
          <Button type="submit" variant="contained" color="inherit"
            onClick={handleSubmit}
            startIcon={<Iconify icon="eva:save-fill" />}>
            Guardar
          </Button>
          <Button type="submit" variant="contained" color="inherit"
            onClick={() => navigate(`/backoffice/inmuebles/ver/${id}`)}
            startIcon={<Iconify icon="eva:close-fill" />}>
            Cancelar
          </Button>
        </Stack>

        {isLoading == false &&

          <Grid container>
            <EditImgGrid id={id} />

            <Grid item xs={12} style={{ marginTop: 30 }}>
              {listaClientesIsLoading == false &&
                <>
                  <FormHelperText id="cliente-label"> Propietario* </FormHelperText>
                  <FormControl>
                    <NativeSelect
                      id="cliente"
                      aria-describedby="cliente-helper"
                      onChange={handleChangeCliente}
                      required
                    >
                      {
                        cliente == null &&
                        <option value="">Seleccione un propietario</option>
                      }
                      {
                        listaClientes.map(cliente => (
                          <option key={cliente._id} value={cliente._id}>{cliente.apellido + ' ' + cliente.nombre} ({cliente.dni})</option>
                        ))
                      }
                    </NativeSelect>
                  </FormControl>
                </>
              }
            </Grid>

            <Grid item xs={12} style={{ marginTop: 20 }}>
              <FormHelperText id="titulo-helper"> Titulo o nombre para la propiedad* </FormHelperText>
              <FormControl sx={{ width: '50%' }}>
                <Input id="titulo" aria-describedby="titulo-helper" value={titulo} onChange={handleChangeTitulo} required/>
              </FormControl>
            </Grid>

            <Grid item xs={2} style={{ marginTop: 20 }}>
              <FormHelperText id="contrato-label">Tipo de contrato*</FormHelperText>
              <FormControl sx={{ width: '50%' }}>
                <NativeSelect
                  id="contrato"
                  aria-describedby="titulo-helper"
                  defaultValue={contrato}
                  onChange={handleChangeSelect}
                  required
                >
                  <option value="Alquiler">Alquiler</option>
                  <option value="Venta">Venta</option>
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid item xs={2} style={{ marginTop: 20 }}>
              <FormHelperText id="estado-label">Estado del contrato*</FormHelperText>
              <FormControl sx={{ width: '50%' }}>
                <NativeSelect
                  id="estado"
                  aria-describedby="titulo-helper"
                  defaultValue={estado}
                >
                  {estados}
                </NativeSelect>
              </FormControl>
            </Grid>

            {/* Precio */}
            <Grid item xs={3} style={{ marginTop: 20 }}>
              <FormHelperText id="precio-helper"> Precio en ARS* </FormHelperText>
              <FormControl>
                <Input 
                  type="number" 
                  id="precio" 
                  aria-describedby="precio-helper" 
                  value={precio} 
                  onChange={handleChangePrecio} 
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={5} style={{ marginTop: 20 }}>
              <FormHelperText id="precioUSD-helper"> Precio en USD* </FormHelperText>
              <FormControl>
                <Input 
                  type="number" 
                  id="precioUSD" 
                  aria-describedby="precioUSD-helper" 
                  value={precioUSD} 
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
              <FormControl sx={{ width: '60%' }}>
                <Input type="number" value={ambientes} id="ambientes" aria-describedby="ambientes-helper" onChange={handleChangeAmbientes} required/>
              </FormControl>
            </Grid>

            <Grid item xs={2} style={{ marginTop: 30 }}>
              <FormHelperText id="habitaciones-helper"> Habitaciones* </FormHelperText>
              <FormControl sx={{ width: '60%' }}>
                <Input value={habitaciones} type="number" id="habitaciones" aria-describedby="habitaciones-helper" onChange={handleChangeHabitaciones} required/>
              </FormControl>
            </Grid>
            <Grid item xs={2} style={{ marginTop: 30 }}>
              <FormHelperText id="banios-helper"> Baños* </FormHelperText>
              <FormControl sx={{ width: '60%' }}>
                <Input value={banios} type="number" id="banios" aria-describedby="banios-helper" onChange={handleChangeBanios} required/>
              </FormControl>
            </Grid>
            <Grid item xs={6} style={{ marginTop: 30 }}>
              <FormHelperText id="superficie-helper"> Superficie en m2* </FormHelperText>
              <FormControl sx={{ width: '60%' }}>
                <Input type="number" id="superficie" aria-describedby="superficie-helper" onChange={handleChangeSuperficie} value={superficie} required/>
              </FormControl>
            </Grid>

            {/* Ubicacion */}
            <Grid item xs={4} style={{ marginTop: 30 }}>
              <FormHelperText id="calle-helper"> Calle* </FormHelperText>
              <FormControl sx={{ width: '90%' }}>
                <Input id="calle" aria-describedby="calle-helper" multiline value={calle} onChange={handleChangeCalle} required/>
              </FormControl>
            </Grid>
            <Grid item xs={2} style={{ marginTop: 30 }}>
              <FormHelperText id="altura-helper"> Altura* </FormHelperText>
              <FormControl sx={{ width: '90%' }}>
                <Input type="number" id="altura" aria-describedby="altura-helper" value={altura} onChange={handleChangeAltura} required/>
              </FormControl>
            </Grid>
            <Grid item xs={3} style={{ marginTop: 30 }}>
              {provinciasIsLoading == false &&
                <>
                  <FormHelperText id="provincia-label">Provincia</FormHelperText>
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
                  </FormControl>
                </>
              }
            </Grid>
            <Grid item xs={3} style={{ marginTop: 30 }}>
              {municipiosIsLoading == false &&
                <>
                  <FormHelperText id="municipio-label"> Localidad </FormHelperText>
                  <FormControl sx={{ width: '90%' }}>
                    <NativeSelect
                      id="municipio"
                      aria-describedby="municipio-helper"
                      onChange={handleChangeMunicipio}
                      value={municipio}
                    >
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

            {/* Descripcion */}
            <Grid item style={{ marginTop: 20, width: '100%' }}>
              <FormHelperText id="descripcion-helper" > Ingrese la descripcion </FormHelperText>
              <FormControl style={{ width: '100%' }}>
                <Input type="number" id="descripcion" aria-describedby="descripcion-helper" multiline value={descripcion} fullWidth={true} onChange={handleChangeDescripcion} />
              </FormControl>
            </Grid>

            <Grid item xs={6} style={{ marginTop: 20, width: '100%' }}>
              <Typography>Activo</Typography><br />
              <FormControlLabel
                control={
                  <Switch checked={activo} onChange={handleChangeActivo} name="activo" id="activo" />
                }
                label="Activo"
              />
            </Grid>

            <Grid item xs={6} style={{ marginTop: 20, width: '100%' }}>
              <Typography>Destacado</Typography><br />
              <FormControlLabel
                control={
                  <Switch checked={destacado} onChange={handleChangeDestacado} name="destacado" id="destacado" />
                }
                label="Destacado"
              />
            </Grid>

          </Grid>
        }
      </form>
    </Container>
  );
}
