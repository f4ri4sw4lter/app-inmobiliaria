import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, InputLabel, Box, FormHelperText, Input, NativeSelect, MenuItem} from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageListEdit } from '../img-lista-edit';

import { useFetchInmuebleById } from '../../../hooks/useFetchInmueblesById';
import { updateInmueble } from '../../../helpers/updateInmueble';

// ----------------------------------------------------------------------

export default function InmuebleEditView() {

  const navigate = useNavigate();

  const { accion, id } = useParams();

  const { inmueble, isLoading } = useFetchInmuebleById({ id });

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

  const [ciudad, setCiudad] = useState('');

  const [provincia, setProvincia] = useState('');

  const [descripcion, setDescripcion] = useState('');
  
  
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
    if(typeof new_value != 'undefined'){
      setAltura(new_value);
    }
  };
  const handleChangeCiudad = (event) => {
    setCiudad(event.target.value);
  };
  const handleChangeProvincia = (event) => {
    setProvincia(event.target.value);
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

  const handleSubmit = (event) => {
    updateInmueble({
      id: id,
      propietario: 1111,
      titulo: titulo,
      contrato: contrato,
      estado: estado,
      precio: precio,
      calle: calle,
      altura: altura,
      ciudad: ciudad,
      provincia: provincia,
      descripcion: descripcion,
      cant_amb: ambientes,
      cant_ba: banios,
      cant_hab: habitaciones,
      equipamiento: '',
      imagenes: '',
      cliente: 0
    });
    navigate('/inmuebles');
  }

  useEffect(() => {
    if(isLoading == false){
      setTitulo(inmueble.titulo);
      setContrato(inmueble.contrato);
      setEstado(inmueble.estado);
      setPrecio(inmueble.precio);
      setPrecioUSD(inmueble.precioUSD);
      setAmbientes(inmueble.cant_amb);
      setBanios(inmueble.cant_ba);
      setHabitaciones(inmueble.cant_hab);
  
      if(typeof inmueble.ubicacion != 'undefined' ){
        setCalle(inmueble.ubicacion['calle']);
        setAltura(parseInt(inmueble.ubicacion['altura'], 10));
        setCiudad(inmueble.ubicacion['ciudad']);
        setProvincia(inmueble.ubicacion['provincia']);
        setDescripcion(inmueble.descripcion);
      }
    }
  },[isLoading])
  
  useEffect(() => {
    if(contrato=='Alquiler'){
      setEstados(<>
        <option value={"En Alquiler"}>En Alquiler</option>
        <option value={"Alquilado"}>Alquilado</option>
      </>)
    }else{
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
        <Typography variant="h4">Editar inmueble</Typography>
        <Button type="submit" variant="contained" color="inherit" startIcon={<Iconify icon="eva:save-fill" />}>
          Guardar
        </Button>
      </Stack>

      {isLoading == false &&
      
      <Grid container>

        <Grid item xs={12}>
          <Button type="" variant="" color="inherit" startIcon={<Iconify icon="eva:upload-fill" />}>
            Agregar foto
          </Button>
          <br />
          <br />
          <HorizontalImageListEdit id={id} />
        </Grid>

        <Grid item xs={12}>
        <br />
        <FormControl>
            <Input id="titulo" aria-describedby="titulo-helper" value={titulo} onChange={handleChangeTitulo}/>
            <FormHelperText id="titulo-helper"> Ingrese el titulo </FormHelperText>
        </FormControl>
        </Grid>
            
        <Grid item xs={3} style={{ marginTop:20 }}>
        <FormControl>
          <NativeSelect
            id="contrato" 
            aria-describedby="titulo-helper"
            defaultValue={contrato}
            onChange={handleChangeSelect}
          >
            <option value="Alquiler">Alquiler</option>
            <option value="Venta">Venta</option>
          </NativeSelect>
          <FormHelperText id="contrato-label">Seleccione un tipo de contrato</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={9} style={{ marginTop:20 }}>
        <FormControl>
          <NativeSelect
            id="estado" 
            aria-describedby="titulo-helper"
            defaultValue={estado}
          >
            {estados}
          </NativeSelect>
          <FormHelperText id="estado-label">Seleccione el estado del inmueble</FormHelperText>
        </FormControl>
        </Grid>

        {/* Precio */}
        <Grid item xs={3} style={{ marginTop:20 }}>
        $
        <FormControl>
          <Input id="precio" aria-describedby="precio-helper" value={precio} onChange={handleChangePrecio}/>
          <FormHelperText id="precio-helper"> Ingrese el precio en ARS</FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={9} style={{ marginTop:20 }}>
        $
        <FormControl>
          <Input type="number" id="precioUSD" aria-describedby="precioUSD-helper" value={precioUSD}  onChange={handleChangePrecioUSD}/>
          <FormHelperText id="precioUSD-helper"> Ingrese el precio en USD </FormHelperText>
        </FormControl>
        </Grid>

        {/* Ambientes */}
        <Grid item xs={4} style={{ marginTop:30 }}>
        <FormControl>
          <Input value={ambientes} type="number" id="ambientes" aria-describedby="ambientes-helper" multiline onChange={handleChangeAmbientes}/>
          <FormHelperText id="ambientes-helper"> Ambientes </FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={4} style={{ marginTop:30 }}>
        <FormControl>
          <Input value={habitaciones} type="number" id="habitaciones" aria-describedby="habitaciones-helper" multiline onChange={handleChangeHabitaciones}/>
          <FormHelperText id="habitaciones-helper"> Habitaciones </FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={4} style={{ marginTop:30 }}>
        <FormControl>
          <Input value={banios} type="number" id="banios" aria-describedby="banios-helper" multiline onChange={handleChangeBanios}/>
          <FormHelperText id="banios-helper"> Baños </FormHelperText>
        </FormControl>
        </Grid>

        {/* Ubicacion */}
        <Grid item xs={3} style={{ marginTop:30 }}>
        <FormControl>
          <Input id="calle" aria-describedby="calle-helper" multiline value={calle} onChange={handleChangeCalle}/>
          <FormHelperText id="calle-helper"> Calle </FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={3} style={{ marginTop:30 }}>
        <FormControl>
          <Input type="number" id="altura" aria-describedby="altura-helper" value={altura} onChange={handleChangeAltura}/>
          <FormHelperText id="altura-helper"> Altura </FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={3} style={{ marginTop:30 }}>
        <FormControl>
          <Input id="ciudad" aria-describedby="ciudad-helper" multiline value={ciudad} onChange={handleChangeCiudad}/>
          <FormHelperText id="ciudad-helper"> Ciudad </FormHelperText>
        </FormControl>
        </Grid>
        <Grid item xs={3} style={{ marginTop:30 }}>
        <FormControl>
          <Input id="provincia" aria-describedby="provincia-helper" multiline value={provincia} onChange={handleChangeProvincia}/>
          <FormHelperText id="provincia-helper"> Provincia </FormHelperText>
        </FormControl>
        </Grid>

        <Grid item xs={12} style={{ marginTop:20 }}>
        <FormControl>
          <Input type="number" id="descripcion" aria-describedby="descripcion-helper" multiline value={descripcion} fullWidth={true} onChange={handleChangeDescripcion}/>
          <FormHelperText id="descripcion-helper"> Ingrese la descripcion </FormHelperText>
        </FormControl>
        </Grid>

        
      </Grid>
      }
      </form>
    </Container>
  );
}
