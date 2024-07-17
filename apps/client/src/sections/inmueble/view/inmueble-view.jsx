import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography, Grid, Box, Paper, Divider, Link } from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageList } from '../img-lista';

import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchInmuebleById } from '../../../hooks/useFetchInmueblesById';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { getProvinciaById } from '../../../helpers/getProvinciaById';
import { getMunicipioById } from '../../../helpers/getMunicipioById';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';

// ----------------------------------------------------------------------

export default function InmuebleView() {

  const navigate = useNavigate();
  const { accion, id } = useParams();
  const { inmueble, isLoading } = useFetchInmuebleById({ id });
  const { cliente, clienteIsLoading, fetchCliente } = useFetchClienteById();

  const [selected, setSelected] = useState([]);
  const [municipio, setMunicipio] = useState([]);
  const [provincia, setProvincia] = useState([]);

  const handleBack = () => {
    navigate('/backoffice/inmuebles');
  };

  useEffect(() => {
    if (!isLoading) {
      getProvinciaById(inmueble.ubicacion.provincia)
        .then(({ provincias }) => setProvincia(provincias[0].nombre))

      getMunicipioById(inmueble.ubicacion.municipio)
        .then(({ municipios }) => setMunicipio(municipios[0].nombre))

      fetchCliente(inmueble.propietario)
    }
  }, [inmueble, isLoading]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <ArrowBack
          sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'primary.main' }, borderRadius: '50%' }}
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
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Propietario</Typography>
          <Typography variant="h6" >
            <Link href={`/backoffice/clientes/ver/${cliente._id}`} sx={{color:'black'}}>
              {cliente.apellido} {cliente.nombre} ({cliente.dni})
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Contrato</Typography>
          <Typography variant="h6" >{inmueble.contrato}</Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Estado</Typography>
          <Typography variant="h6">{inmueble.estado}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h4" sx={{ color: 'primary.main' }}>Precio</Typography>
          <Typography variant="h6" >{inmueble.precio ? '$'+inmueble.precio+' ARS' : 'No especificado'} 
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Typography variant="h4" sx={{ color: 'primary.main' }}>Precio en USD</Typography>
          <Typography variant="h6" >{inmueble.precioUSD ? '$'+inmueble.precioUSD+' USD' : 'No especificado'}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Ambientes</Typography>
          <Typography variant="h6" >{inmueble.cant_amb}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Habitaciones</Typography>
          <Typography variant="h6" >{inmueble.cant_hab}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Baños</Typography>
          <Typography variant="h6" >{inmueble.cant_ba}</Typography>
        </Grid>
        <Grid item xs={6}>
        </Grid>

        <Divider orientation="horizontal" sx={{ backgroundColor: 'black', height: '3px', color: 'black' }} />

        {inmueble.ubicacion &&
          <Grid item xs={12}>
            <Typography variant="h4" sx={{ color: 'primary.main' }}>Ubicacion</Typography>
            <Typography variant="h6" >{inmueble.ubicacion['calle']} {inmueble.ubicacion['altura']}, {municipio}, {provincia}</Typography>
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
            <Typography variant="h4" sx={{ color: 'primary.main' }}>Descripcion</Typography>
            <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>{inmueble.descripcion}</Typography>
          </Grid>
        }

      </Grid>
    </Container>
  );
}
