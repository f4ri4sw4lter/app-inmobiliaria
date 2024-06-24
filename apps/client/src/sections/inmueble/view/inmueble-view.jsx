import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography, Grid, Box, Paper, Divider } from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageList } from '../img-lista';

import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchInmuebleById } from '../../../hooks/useFetchInmueblesById';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { getProvinciaById } from '../../../helpers/getProvinciaById';
import { getMunicipioById } from '../../../helpers/getMunicipioById';

// ----------------------------------------------------------------------

export default function InmuebleView() {

  const navigate = useNavigate();
  const { accion, id } = useParams();
  const { inmueble, isLoading } = useFetchInmuebleById({ id });
  const [selected, setSelected] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [provincia, setProvincia] = useState([]);

  const handleBack = () => {
    navigate('/backoffice/inmuebles');
  };

  useEffect(() => {
    if(!isLoading){
      getProvinciaById(inmueble.ubicacion.provincia)
      .then(({provincias}) => setProvincia(provincias[0].nombre))

      getMunicipioById(inmueble.ubicacion.municipio)
      .then(({municipios}) => setMunicipio(municipios[0].nombre))
    }
  }, [inmueble, isLoading]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <ArrowBack 
          sx={{ cursor: 'pointer' , '&:hover': { backgroundColor: 'primary.main' }, borderRadius: '50%' }} 
          onClick={handleBack} 
          />
        <Typography variant="h4">{inmueble.titulo}</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:edit-fill" />} href={`/backoffice/inmuebles/editar/${id}`}>
          Editar
        </Button>
      </Stack>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <HorizontalImageList id={id} />
        </Grid>

        <Grid item xs={12}>
          {inmueble.cant_amb &&
            <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '16px' }}> {inmueble.cant_amb} ambientes 
            </Typography>
          }
          |
          {inmueble.cant_hab &&
            <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '16px' }}> {inmueble.cant_hab} habitaciones 
            </Typography>
          }|
          {inmueble.cant_ba &&
            <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '16px'  }}> {inmueble.cant_ba} baños
            </Typography>
          }
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Propietario</Typography>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>{inmueble.propietario}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h5">Contrato</Typography>
          <Typography variant="h6" sx={{ color: 'primary.main' }}>{inmueble.contrato}</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" >Estado</Typography>
          {inmueble.estado == 'Alquilado' || inmueble.estado == 'Vendido'
            ? (
              <Typography variant="h6" sx={{ color: 'red' }}>{inmueble.estado}</Typography>
            ) : (
              <Typography variant="h6" sx={{ color: 'green' }}>{inmueble.estado}</Typography>
            )}
        </Grid>


        {inmueble.precio &&
          <Grid item xs={2}>
            <Typography variant="h4" >Precio</Typography>
            <Typography variant="h6" sx={{ color: 'primary.main'}}>${inmueble.precio}ARS
            </Typography>
          </Grid>
        }
        {inmueble.precio_usd &&
          <Grid item xs={10}>
            <Typography variant="h6" sx={{ color: 'primary.main'}}>${inmueble.precio}USD
            </Typography>
          </Grid>
        }

        <Divider orientation="horizontal" sx={{ backgroundColor: 'black', height: '3px', color: 'black' }} />

        {inmueble.ubicacion &&
          <Grid item xs={12}>
            <Typography variant="h4" sx={{}}>Ubicacion</Typography>
            <Typography variant="h6" sx={{ color: 'primary.main'}}>{inmueble.ubicacion['calle']} {inmueble.ubicacion['altura']}, {municipio}, {provincia}</Typography>
            {inmueble.ubicacion['mapa'] &&
              <Grid item xs={12}>
                <iframe
                  src={inmueble.ubicacion['mapa']}
                  width="600"
                  height="400"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Grid>
            } 
          </Grid>
        }

        <Divider variant="middle" orientation="horizontal" flexItem style={{ backgroundColor: 'black', height: '3px', color: 'black' }} />

        {inmueble.descripcion &&
          <Grid item xs={12}>
            <Typography variant="h4" sx={{}}>Descripcion</Typography>
            <Typography variant="h6" sx={{ color: 'primary.main', whiteSpace: 'pre-line' }}>{inmueble.descripcion}</Typography>
          </Grid>
        }

      </Grid>
    </Container>
  );
}
