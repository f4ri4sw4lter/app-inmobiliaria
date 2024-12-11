import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect } from '@mui/material'

import Iconify from '../../../components/iconify';
import { useFetchListaClientes } from '../../../hooks/useFetchListaClientes';
import { useFetchListaInmuebles } from '../../../hooks/useFetchListaInmuebles';
import { createContrato, updateInmueble } from '../../../helpers';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';

// ----------------------------------------------------------------------

export default function ContratoCreateView() {

    const { listaInmuebles, isLoading } = useFetchListaInmuebles('titulo');
    const { listaClientes, listaClientesIsLoading } = useFetchListaClientes('apellido');
    const { cliente, clienteIsLoading, fetchCliente } = useFetchClienteById();

    const navigate = useNavigate();

    const [inmuebleContrato, setInmueble] = useState();
    const [clienteContrato, setCliente] = useState();
    const [propietarioContrato, setPropietario] = useState('');
    const [detalle, setDetalle] = useState('');
    const [contrato, setContrato] = useState('');
    const [estadoContrato, setEstado] = useState('');



    const handleChangeInmueble = (event) => {
        const inmuebleFiltrado = listaInmuebles.filter(inmueble => inmueble._id === event.target.value);
        setInmueble(inmuebleFiltrado[0]);
        setContrato(inmuebleFiltrado[0].contrato)

        if (inmuebleFiltrado[0].contrato == 'Venta') {
            setEstado('Vendido');
        } else {
            setEstado('Alquilado');
        }

        const propietarioFiltrado = inmuebleFiltrado[0].propietario;
        if (propietarioFiltrado != propietarioContrato) {
            fetchCliente(propietarioFiltrado)
        }
    };
    const handleChangeCliente = (event) => {
        const clienteFiltrado = listaClientes.filter(cliente => cliente._id === event.target.value);
        setCliente(clienteFiltrado[0]);
    };
    const handleChangeDetalle = (event) => {
        setDetalle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            // Asumimos que createContrato y updateInmueble son funciones asincrónicas
            await createContrato({
                inmueble: inmuebleContrato,
                propietario: propietarioContrato,
                cliente: clienteContrato,
                detalle: detalle
            });

            await updateInmueble({
                id: inmuebleContrato._id,
                estado: estadoContrato
            });

            navigate('/backoffice/contratos');
        } catch (error) {
            console.error("Error al crear el contrato o actualizar el inmueble:", error);
            // Manejo de errores, como mostrar un mensaje al usuario
        }
    }


    useEffect(() => {
        if (!clienteIsLoading) {
            setPropietario(cliente)
        }
    }, [clienteIsLoading, cliente]);

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Guardar Contrato</Typography>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Button type="submit" variant="contained" color="inherit" startIcon={<Iconify icon="eva:save-fill" />}>
                            Guardar
                        </Button>
                        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:close-fill" />} sx={{ ml: 1 }} href="/backoffice/contratos">
                            Cancelar
                        </Button>
                    </Stack>

                </Stack>

                <Grid container>

                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        {!isLoading &&
                            <FormControl style={{ width: '100%' }}>
                                <FormHelperText id="inmueble-label">Inmueble</FormHelperText>
                                <NativeSelect
                                    id="inmueble"
                                    aria-describedby="inmueble-helper"
                                    onChange={handleChangeInmueble}
                                    sx={{ border: '1px solid #ccc', borderRadius: 1, marginLeft: 2, width: '100%' }}
                                    disableUnderline={true}
                                >
                                    <option key='' value='' >Seleccione un inmueble</option>
                                    {
                                        listaInmuebles
                                            .filter((inmueble) => (inmueble.estado !== 'Alquilado' && inmueble.estado !== 'Vendido'))
                                            .map((inmueble) => (
                                                <option key={inmueble._id} value={inmueble._id}>{inmueble.titulo}</option>
                                            ))
                                    }
                                </NativeSelect>

                            </FormControl>
                        }
                        <Grid item xs={12} >
                            <FormControl style={{ width: '100%', marginTop: 10 }} >
                                <FormHelperText id="propietario-helper" > Tipo de contrato </FormHelperText>
                                <Input id="contrato" aria-describedby="contrato-helper" value={contrato} readOnly={true} disableUnderline={true} sx={{ marginLeft: 2 }} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} >
                            <FormControl style={{ width: '100%', marginTop: 10 }} >
                                <FormHelperText id="propietario-helper" > Propietario </FormHelperText>
                                <Input id="propietario" aria-describedby="propietario-helper" disableUnderline={true} value={(propietarioContrato == '') ? '' : '(' + propietarioContrato.dni + ')' + propietarioContrato.apellido + ' ' + propietarioContrato.nombre} readOnly={true} sx={{ marginLeft: 2 }} />
                            </FormControl>
                        </Grid>

                        {!listaClientesIsLoading &&
                            <FormControl style={{ width: '100%', marginTop: 10 }}>
                                <FormHelperText id="cliente-label">cliente</FormHelperText>
                                <NativeSelect
                                    id="cliente"
                                    aria-describedby="cliente-helper"
                                    onChange={handleChangeCliente}
                                    sx={{ border: '1px solid #ccc', borderRadius: 1, marginLeft: 2 }}
                                    disableUnderline={true}
                                >
                                    <option key='' value='' >Seleccione un cliente</option>
                                    {
                                        listaClientes
                                            .filter((clientes) => (clientes._id !== propietarioContrato._id))
                                            .map((clientes) => (
                                                <option key={clientes.dni} value={clientes._id}>{clientes.apellido + ' ' + clientes.nombre + ' (' + clientes.dni + ')'}</option>
                                            ))
                                    }
                                </NativeSelect>
                            </FormControl>
                        }
                        <Grid item xs={12} style={{ marginTop: 20, width: '100%' }}>
                            <FormControl style={{ width: '100%' }}>
                                <FormHelperText id="detalle-helper"> Ingrese algun detalle </FormHelperText>
                                <Input id="detalle" aria-describedby="detalle-helper" multiline fullWidth={true} onChange={handleChangeDetalle} sx={{ marginLeft: 2 }} />
                            </FormControl>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
}
