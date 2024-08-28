import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect } from '@mui/material'

import Iconify from '../../../components/iconify';
import { useFetchListaClientes } from '../../../hooks/useFetchListaClientes';
import { useFetchListaInmuebles } from '../../../hooks/useFetchListaInmuebles';
import { createContrato } from '../../../helpers';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';

// ----------------------------------------------------------------------

export default function ContratoEditView() {

    const { listaInmuebles, isLoading } = useFetchListaInmuebles();
    const { listaClientes, listaClientesIsLoading } = useFetchListaClientes();
    const { cliente, clienteIsLoading, fetchCliente } = useFetchClienteById();

    const navigate = useNavigate();

    const [ inmuebleContrato, setInmueble] = useState();
    const [ clienteContrato, setCliente] = useState();
    const [ propietarioContrato, setPropietario] = useState('');
    const [ detalle, setDetalle] = useState('');
    const [ contrato, setContrato ] = useState('');
    const [ estado, setEstado ] = useState('');



    const handleChangeInmueble = (event) => {
        setInmueble(event.target.value);
        const inmuebleFiltrado = listaInmuebles.filter(inmueble => inmueble._id === event.target.value);
        
        setContrato(inmuebleFiltrado[0].contrato)
        setEstado(inmuebleFiltrado[0].estado)
        
        const propietarioFiltrado = inmuebleFiltrado[0].propietario;
        if(propietarioFiltrado != propietarioContrato){
            fetchCliente(propietarioFiltrado)
        }
    };
    const handleChangeCliente = (event) => {
        setCliente(event.target.value);
    };
    const handleChangeDetalle = (event) => {
        setDetalle(event.target.value);
    };

    const handleSubmit = (event) => {
        createContrato({
            inmueble: inmuebleContrato,
            propietario: propietarioContrato._id,
            cliente: clienteContrato,
            detalle: detalle
        });
        navigate('/backoffice/contratos');
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
                                    value={inmuebleContrato}
                                    onChange={handleChangeInmueble}
                                    sx = {{ border: '1px solid #ccc', borderRadius: 1, marginLeft: 2, width: '100%' }}
                                    disableUnderline={true}
                                >
                                    <option key='' value='' >Seleccione un inmueble</option>
                                    {
                                        listaInmuebles.map((inmueble) => (
                                            <option key={inmueble._id} value={inmueble._id}>{inmueble.titulo}</option>
                                        ))
                                    }
                                </NativeSelect>
                                
                            </FormControl>
                        }
                        <Grid item xs={12} >
                            <FormControl style={{ width: '100%', marginTop: 10 }} >
                                <FormHelperText id="propietario-helper" > Tipo de contrato </FormHelperText>
                                <Input id="contrato" aria-describedby="contrato-helper" value={contrato} readOnly={true} disableUnderline={true} sx={{ marginLeft: 2 }}/>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} >
                            <FormControl style={{ width: '100%', marginTop: 10 }} >
                                <FormHelperText id="propietario-helper" > Propietario </FormHelperText>
                                <Input id="propietario" aria-describedby="propietario-helper" disableUnderline={true} value={(propietarioContrato == '') ? '' : '(' + propietarioContrato.dni + ')' + propietarioContrato.apellido + ' ' + propietarioContrato.nombre} readOnly={true} sx={{ marginLeft: 2 }}/>
                            </FormControl>
                        </Grid>

                        {!listaClientesIsLoading &&
                            <FormControl style={{ width: '100%', marginTop: 10 }}>
                                <FormHelperText id="cliente-label">cliente</FormHelperText>
                                <NativeSelect
                                    id="cliente"
                                    aria-describedby="cliente-helper"
                                    value={clienteContrato}
                                    onChange={handleChangeCliente}
                                    sx = {{ border: '1px solid #ccc', borderRadius: 1, marginLeft: 2}}
                                    disableUnderline={true}
                                >
                                    <option key='' value='' >Seleccione un cliente</option>
                                    {
                                        listaClientes.map((clientes) => (
                                            <option key={clientes._id} value={clientes._id}>{'(' + clientes.dni + ')' + clientes.apellido + ' ' + clientes.nombre}</option>
                                        ))
                                    }
                                </NativeSelect>
                            </FormControl>
                        }
                        <Grid item xs={12} style={{ marginTop: 20, width: '100%' }}>
                            <FormControl style={{ width: '100%' }}>
                                <FormHelperText id="detalle-helper"> Ingrese algun detalle </FormHelperText>
                                <Input id="detalle" aria-describedby="detalle-helper" multiline fullWidth={true} onChange={handleChangeDetalle} sx={{ marginLeft: 2 }}/>
                            </FormControl>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
}
