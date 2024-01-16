import { useState } from 'react';
import { useParams } from "react-router-dom";

import { Stack, Button, Container, Typography, Grid, Box, Paper, Divider } from '@mui/material'

import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { HorizontalImageList } from '../img-lista';

import { emptyRows, applyFilter, getComparator } from '../utils';
import { useFetchInmuebleById } from '../../../hooks/useFetchInmueblesById';

// ----------------------------------------------------------------------

export default function InmuebleView() {
  const { accion, id } = useParams();

  const { inmueble, isLoading } = useFetchInmuebleById({ id });

  console.log(inmueble);

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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{inmueble.titulo}</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:edit-fill" />}>
          Editar Inmueble
        </Button>
      </Stack>
      <Grid container spacing={2}>
        
        <Grid item xs={12}>
          <HorizontalImageList />
        </Grid>

        <Grid item xs={12}>
            <Typography variant="caption">{inmueble.cant_amb} ambientes
            </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">{inmueble.contrato}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h3">${inmueble.precio}ARS
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">${inmueble.precio}USD
          </Typography>
        </Grid>

        <hr/>
        <Divider variant="middle" orientation="horizontal" flexItem style={{ backgroundColor: 'black', height: '3px', color:'black' }}/>

        <Grid item xs={12}>
          {inmueble.ubicacion &&
            <Typography variant="h5">{inmueble.ubicacion['calle']} {inmueble.ubicacion['altura']}, {inmueble.ubicacion['ciudad']}, {inmueble.ubicacion['provincia']}
            </Typography>
          }
        </Grid>

      </Grid>
    </Container>
  );
}
