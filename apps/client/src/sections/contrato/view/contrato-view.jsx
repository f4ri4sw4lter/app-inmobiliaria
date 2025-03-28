import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect } from '@mui/material'

import Iconify from '../../../components/iconify';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';
import { useFetchContratoById } from '../../../hooks/useFetchContratoById';
import ListaDocs from '../../documentos/lista-docs';

// ----------------------------------------------------------------------

export default function ContratoView() {

    const { accion, id } = useParams();
    const { contrato, contratoIsLoading, fetchContrato } = useFetchContratoById(id);

    const navigate = useNavigate();

    const handleChangeCliente = (event) => {
        setCliente(event.target.value);
    };
    const handleChangeDetalle = (event) => {
        setDetalle(event.target.value);
    };

    const fecha = new Date(contrato.fecha);
    const fechaFormateada = `${fecha.getFullYear()}-${('0' + (fecha.getMonth() + 1)).slice(-2)}-${('0' + fecha.getDate()).slice(-2)}`;

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Contrato</Typography>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:cancel-fill" />} sx={{ ml: 1 }} href="/backoffice/contratos">
                        Volver
                    </Button>
                </Stack>

            </Stack>


            {!contratoIsLoading &&
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ color: 'primary.main' }}>Propietario </Typography>
                        <Typography variant="h6" >{contrato.propietario.apellido} {contrato.propietario.nombre}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ color: 'primary.main', marginTop: 2 }}>Inmueble </Typography>
                        <Typography variant="h6" >{contrato.inmueble.titulo}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ color: 'primary.main', marginTop: 2 }}>cliente </Typography>
                        <Typography variant="h6" >{contrato.cliente.apellido} {contrato.cliente.nombre}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ color: 'primary.main', marginTop: 2 }}>Fecha </Typography>
                        <Typography variant="h6" >{fechaFormateada}</Typography>
                    </Grid>
                </Grid>
            }

            <br />

            <ListaDocs reference='contratos' ownerId={id} />

        </>
    );
}
