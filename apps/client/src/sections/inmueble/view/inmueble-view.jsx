import { useState } from 'react';
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

// ----------------------------------------------------------------------

export default function InmuebleView() {

  const navigate = useNavigate();
  const { accion, id } = useParams();
  const { inmueble, isLoading } = useFetchInmuebleById({ id });
  const [selected, setSelected] = useState([]);


  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleBack = () => {
    navigate('/inmuebles');
  };


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <ArrowBack 
          sx={{ cursor: 'pointer' , '&:hover': { backgroundColor: 'primary.main' }, borderRadius: '50%' }} 
          onClick={handleBack} 
          />
        <Typography variant="h4">{inmueble.titulo}</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:edit-fill" />} href={`/inmuebles/editar/${id}`}>
          Editar
        </Button>
      </Stack>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <HorizontalImageList id={id} />
        </Grid>

        <Grid item xs={12}>
          {inmueble.cant_amb &&
            <Typography variant="caption"> {inmueble.cant_amb} ambientes |
            </Typography>
          }
          {inmueble.cant_hab &&
            <Typography variant="caption"> {inmueble.cant_hab} habitaciones |
            </Typography>
          }
          {inmueble.cant_ba &&
            <Typography variant="caption"> {inmueble.cant_ba} baños
            </Typography>
          }
        </Grid>

        <Grid item xs={2}>
          <Typography variant="h5">{inmueble.contrato}</Typography>
        </Grid>
        <Grid item xs={10}>
          {inmueble.estado == 'Alquilado' || inmueble.estado == 'Vendido'
            ? (
              <Typography variant="h5" sx={{ color: 'red' }}>{inmueble.estado}</Typography>
            ) : (
              <Typography variant="h5" sx={{ color: 'green' }}>{inmueble.estado}</Typography>
            )}

        </Grid>


        {inmueble.precio &&
          <Grid item xs={2}>
            <Typography variant="h4" sx={{}}>Precio</Typography>
            <Typography variant="h5">${inmueble.precio}ARS
            </Typography>
          </Grid>
        }
        {inmueble.precio_usd &&
          <Grid item xs={10}>
            <Typography variant="h5">${inmueble.precio}USD
            </Typography>
          </Grid>
        }

        <Divider orientation="horizontal" sx={{ backgroundColor: 'black', height: '3px', color: 'black' }} />

        {inmueble.ubicacion &&
          <Grid item xs={12}>
            <Typography variant="h4" sx={{}}>Ubicacion</Typography>
            <Typography variant="h5">{inmueble.ubicacion['calle']} {inmueble.ubicacion['altura']}, {inmueble.ubicacion['ciudad']}, {inmueble.ubicacion['provincia']}
            </Typography>
          </Grid>
        }

        <Divider variant="middle" orientation="horizontal" flexItem style={{ backgroundColor: 'black', height: '3px', color: 'black' }} />

        {inmueble.descripcion &&
          <Grid item xs={12}>
            <Typography variant="h4" sx={{}}>Descripcion</Typography>
            <h5>{inmueble.descripcion}
            </h5>
          </Grid>
        }

      </Grid>
    </Container>
  );
}
