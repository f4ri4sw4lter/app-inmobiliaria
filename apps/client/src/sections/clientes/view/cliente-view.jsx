import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, Divider, Box } from '@mui/material'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';

import Iconify from '../../../components/iconify';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { getProvinciaById } from '../../../helpers/getProvinciaById';
import { getMunicipioById } from '../../../helpers/getMunicipioById';
import { useFetchInmueblesByCliente } from '../../../hooks/useFetchInmueblesByCliente';
import ListaDocs from '../../documentos/lista-docs';

// ----------------------------------------------------------------------

export default function ClienteView() {

    const navigate = useNavigate();
    const { accion, id } = useParams();
    const { cliente, clienteIsLoading } = useFetchClienteById(id);
    const { inmuebles, isLoading, fetchInmueblesByCliente } = useFetchInmueblesByCliente();
    const [municipio, setMunicipio] = useState([]);
    const [provincia, setProvincia] = useState([]);

    const handleBack = () => {
        navigate('/backoffice/clientes');
    };

    useEffect(() => {
        if (!clienteIsLoading) {
            getProvinciaById(cliente.ubicacion.provincia)
                .then(({ provincias }) => setProvincia(provincias[0].nombre))

            getMunicipioById(cliente.ubicacion.municipio)
                .then(({ municipios }) => setMunicipio(municipios[0].nombre))

            fetchInmueblesByCliente(cliente._id);
        }
    }, [cliente, clienteIsLoading]);

    return (
        <>
            {!clienteIsLoading &&
            <Box>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <ArrowBack
                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'primary.main' }, borderRadius: '50%' }}
                            onClick={handleBack}
                        />
                        <Typography variant="h4">Perfil del cliente</Typography>
                        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:edit-fill" />} href={`/backoffice/clientes/editar/${id}`}>
                            Editar
                        </Button>
                    </Stack>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Nombre completo </Typography>
                            <Typography variant="h6" >{cliente.apellido} {cliente.nombre}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>DNI </Typography>
                            <Typography variant="h6" >{cliente.dni}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Correo </Typography>
                            <Typography variant="h6" >{cliente.correo}</Typography>
                        </Grid>

                        <Grid item xs={2} >
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Celular </Typography>
                            <Typography variant="h6" >{cliente.celular}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Telefono </Typography>
                            <Typography variant="h6" >{cliente.telefono}</Typography>
                        </Grid>
                        <Grid item xs={8}></Grid>

                        <Grid item xs={12}>
                            <Typography variant="h4" sx={{ color: 'primary.main' }}>Ubicacion</Typography>
                            <Typography variant="h6" >{cliente.ubicacion['calle']} {cliente.ubicacion['altura']}, {municipio}, {provincia}</Typography>
                        </Grid>
                    </Grid>


                <Typography variant="h4" sx={{ color: 'primary.main', mt: 5 }}>Inmuebles del cliente</Typography>
                {!isLoading &&
                <TableContainer component={Paper}>
                    <br />
                    <Table sx={{ minWidth: 650, border: '1px solid #ccc' }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ border: '1px solid #ccc' }}>Titulo</TableCell>
                                <TableCell sx={{ border: '1px solid #ccc' }}>Estado</TableCell>
                                <TableCell sx={{ border: '1px solid #ccc' }}>Precio ARS</TableCell>
                                <TableCell sx={{ border: '1px solid #ccc' }}>Precio USD</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inmuebles.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell sx={{ border: '1px solid #ccc' }}>
                                        <Link href={`/backoffice/inmuebles/ver/${row._id}`}>{row.titulo}</Link>
                                    </TableCell>
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{row.estado}</TableCell>
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{row.precio}</TableCell>
                                    <TableCell sx={{ border: '1px solid #ccc' }}>{row.precioUSD ? row.precioUSD : 'No especificado'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                }
            </Box>
            }
            <br />

            <ListaDocs reference='clientes' ownerId={id} />
        </>
    );
}
