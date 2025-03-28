import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Container, Typography, Grid, Box, Paper, Divider, Link } from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageList } from '../img-lista';

import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchInmuebleById } from '../../../hooks/useFetchInmueblesById';
import { useFetchContratoByInmueble } from '../../../hooks/useFetchContratoByInmuebleId';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { getProvinciaById } from '../../../helpers/getProvinciaById';
import { getMunicipioById } from '../../../helpers/getMunicipioById';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';
import ListaDocs from '../../documentos/lista-docs';

// ----------------------------------------------------------------------

export default function InmuebleView() {

  const StyledNavLink = styled(NavLink)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    padding: theme.spacing(1),
    transition: 'color 0.3s, background-color 0.3s',

    '&:hover': {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },

    '&.active': {
      fontWeight: 'bold',
      color: 'blue',
    },
  }));

  const navigate = useNavigate();
  const { accion, id } = useParams();
  const { inmueble, isLoading } = useFetchInmuebleById({ id });
  const { cliente, clienteIsLoading, fetchCliente } = useFetchClienteById();
  const { contrato, contratoIsLoading } = useFetchContratoByInmueble(id);

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
    <>
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
            <Link href={`/backoffice/clientes/ver/${cliente._id}`} sx={{ color: 'black' }}>
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
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Precio ARS</Typography>
          <Typography variant="h6" >{inmueble.precio ? '$' + inmueble.precio + ' ARS' : 'No especificado'}
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Precio USD</Typography>
          <Typography variant="h6" >{inmueble.precioUSD ? '$' + inmueble.precioUSD + ' USD' : 'No especificado'}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Infantes</Typography>
          <Typography variant="h6" >{inmueble.infantes ? 'SI' : 'NO'}</Typography>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Mascotas</Typography>
          <Typography variant="h6" >{inmueble.mascotas ? 'SI' : 'NO'}</Typography>
        </Grid>

        <Grid item xs={8}>
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Cochera</Typography>
          <Typography variant="h6" >{inmueble.cochera ? 'SI' : 'NO'}</Typography>
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
          <Typography variant="h5" sx={{ color: 'primary.main' }}>Superficie</Typography>
          <Typography variant="h6" >{inmueble.superficie} m2</Typography>
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

        <Grid item xs={6}>
          <Typography variant="h4" sx={{ color: 'primary.main' }}>Activo</Typography>
          <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>{inmueble.activo ? 'SI' : 'NO'}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h4" sx={{ color: 'primary.main' }}>Destacado</Typography>
          <Typography variant="h6" sx={{ whiteSpace: 'pre-line' }}>{inmueble.destacado ? 'SI' : 'NO'}</Typography>
        </Grid>

      </Grid>
      <br />
      <ListaDocs reference='inmuebles' ownerId={id} />

      {(!contratoIsLoading && contrato) &&
        <StyledNavLink to={`/backoffice/contratos/ver/${contrato._id}`}
          sx={{
            color: 'primary.main',
            borderRadius: '10px',
            padding: '10px',
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid grey',
          }}>
          Ver Contrato
        </StyledNavLink>
      }
    </>
  );
}
