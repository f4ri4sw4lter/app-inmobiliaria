import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect, Link} from '@mui/material'

import Iconify from '../../../components/iconify';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';
import { useFetchContratoById } from '../../../hooks/useFetchContratoById';
import ListaDocs from '../../documentos/lista-docs';
import AdsClickIcon from '@mui/icons-material/AdsClick';

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

    console.log(contrato);

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
                        <Button variant="contained">
                            <Link
                                href={`/backoffice/clientes/ver/${contrato.propietario._id}`}
                                sx={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'white',
                                    }
                                }}
                            >
                                {contrato.propietario.apellido} {contrato.propietario.nombre} <AdsClickIcon sx={{ verticalAlign: 'middle' }} />
                            </Link>
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ color: 'primary.main', marginTop: 2 }}>Inmueble </Typography>
                        <Button variant="contained">
                            <Link
                                href={`/backoffice/inmuebles/ver/${contrato.inmueble._id}`}
                                sx={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'white',
                                    }
                                }}
                            >
                                {contrato.inmueble.titulo} <AdsClickIcon sx={{ verticalAlign: 'middle' }} />
                            </Link>
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{ color: 'primary.main', marginTop: 2 }}>cliente </Typography>
                        <Button variant="contained">
                            <Link
                                href={`/backoffice/clientes/ver/${contrato.cliente._id}`}
                                sx={{
                                    color: 'black',
                                    textDecoration: 'none',
                                    '&:hover': {
                                        color: 'white',
                                    }
                                }}
                            >
                                {contrato.cliente.apellido} {contrato.cliente.nombre} <AdsClickIcon sx={{ verticalAlign: 'middle' }} />
                            </Link>
                        </Button>
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
