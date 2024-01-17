import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Stack, Button, Container, Typography, Grid, FormControl, InputLabel, Box, FormHelperText, Input, NativeSelect, MenuItem} from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageList } from '../img-lista';

import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchInmuebleById } from '../../../hooks/useFetchInmueblesById';

// ----------------------------------------------------------------------

export default function InmuebleEditView() {
  const { accion, id } = useParams();

  const { inmueble, isLoading } = useFetchInmuebleById({ id });

  const [titulo, setTitulo] = useState('')

  const [contrato, setContrato] = useState('')

  const [estados, setEstados] = useState('')
  
  const handleChangeSelect = (event) => {
    setContrato(event.target.value);
  };
  
  useEffect(() => {
    setContrato(inmueble.contrato)
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
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Editar inmueble</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:save-fill" />}>
          Guardar
        </Button>
      </Stack>

      {isLoading == false &&
      <FormControl>
        <Grid container>
          <Grid item xs={12}>
            <Input id="titulo" aria-describedby="titulo-helper" value={inmueble.titulo}/>
            <FormHelperText id="titulo-helper"> Ingrese el titulo </FormHelperText>
          </Grid>
          
          <Grid item xs={3} style={{ marginTop:20 }}>
            <NativeSelect 
              labelId="contrato-label"
              id="contrato" 
              aria-describedby="titulo-helper"
              defaultValue={inmueble.contrato}
              onChange={handleChangeSelect}
            >
              <option value="Alquiler">Alquiler</option>
              <option value="Venta">Venta</option>
            </NativeSelect>
            <FormHelperText id="contrato-label">Seleccione un tipo de contrato</FormHelperText>
          </Grid>
          <Grid item xs={9} style={{ marginTop:20 }}>
            <NativeSelect 
              labelId="estado-label"
              id="estado" 
              aria-describedby="titulo-helper"
              defaultValue={inmueble.estado}
            >
              {estados}
            </NativeSelect>
            <FormHelperText id="estado-label">Seleccione el estado del inmueble</FormHelperText>
          </Grid>

          {/* Precio */}
          <Grid item xs={3} style={{ marginTop:20 }}>
            $<Input id="precio" aria-describedby="precio-helper" value={inmueble.precio}/>
            <FormHelperText id="precio-helper"> Ingrese el precio en ARS</FormHelperText>
          </Grid>
          <Grid item xs={9} style={{ marginTop:20 }}>
            $<Input type="number" id="precioUSD" aria-describedby="precioUSD-helper" value={inmueble.precioUSD}/>
            <FormHelperText id="precioUSD-helper"> Ingrese el precio en USD </FormHelperText>
          </Grid>

          {/* Ubicacion */}
          <Grid item xs={3} style={{ marginTop:30 }}>
            <Input id="calle" aria-describedby="calle-helper" multiline value={inmueble.ubicacion['calle']}/>
            <FormHelperText id="calle-helper"> Calle </FormHelperText>
          </Grid>
          <Grid item xs={3} style={{ marginTop:30 }}>
            <Input type="number" id="altura" aria-describedby="altura-helper" multiline value={inmueble.ubicacion['altura']}/>
            <FormHelperText id="altura-helper"> Altura </FormHelperText>
          </Grid>
          <Grid item xs={3} style={{ marginTop:30 }}>
            <Input id="ciudad" aria-describedby="ciudad-helper" multiline value={inmueble.ubicacion['ciudad']}/>
            <FormHelperText id="ciudad-helper"> Ciudad </FormHelperText>
          </Grid>
          <Grid item xs={3} style={{ marginTop:30 }}>
            <Input id="provincia" aria-describedby="provincia-helper" multiline value={inmueble.ubicacion['provincia']}/>
            <FormHelperText id="provincia-helper"> Provincia </FormHelperText>
          </Grid>

          <Grid item xs={12} style={{ marginTop:20 }}>
            <Input type="number" id="descripcion" aria-describedby="descripcion-helper" multiline value={inmueble.descripcion} fullWidth={true}/>
            <FormHelperText id="descripcion-helper"> Ingrese la descripcion </FormHelperText>
          </Grid>

        </Grid>
      </FormControl>  
      }
    </Container>
  );
}
