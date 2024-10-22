import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect } from '@mui/material'

import Iconify from '../../../components/iconify';

import { createCliente } from '../../../helpers/createCliente';
import { useFetchProvincias } from '../../../hooks/useFetchProvincias';
import { useFetchMunicipios } from '../../../hooks/useFetchMunicipios';

// ----------------------------------------------------------------------

export default function ClienteCreateView() {

    const { provincias, provinciasIsLoading } = useFetchProvincias();

    const { municipios, municipiosIsLoading, fetchMunicipios } = useFetchMunicipios(2);

    const navigate = useNavigate();

    const [dni, setDni] = useState('');

    const [nombre, setNombre] = useState('');

    const [apellido, setApellido] = useState('');

    const [correo, setCorreo] = useState('');

    const [celular, setCelular] = useState('');

    const [telefono, setTelefono] = useState('');

    const [calle, setCalle] = useState('');

    const [altura, setAltura] = useState('');

    const [provincia, setProvincia] = useState('');

    const [municipio, setMunicipio] = useState('');


    const handleChangeDni = (event) => {
        setDni(event.target.value);
    };

    const handleChangeNombre = (event) => {
        setNombre(event.target.value);
    };
    const handleChangeApellido = (event) => {
        setApellido(event.target.value);
    };

    const handleChangeCorreo = (event) => {
        setCorreo(event.target.value);
    };
    const handleChangeCelular = (event) => {
        setCelular(event.target.value);
    };

    // UBICACION
    const handleChangeTelefono = (event) => {
        setTelefono(event.target.value);
    };
    const handleChangeAltura = (event) => {
        const { value } = event.target;
        const new_value = value.replace(/[a-zA-Z]/g, '');
        if (typeof new_value != 'undefined') {
            setAltura(new_value);
        }
    };

    const handleChangeProvincia = (event) => {
        setProvincia(event.target.value);
        fetchMunicipios(event.target.value);
    };

    const handleChangeMunicipio = (event) => {
        setMunicipio(event.target.value);
    };

    const handleChangeDescripcion = (event) => {
        setDescripcion(event.target.value);
    };
    const handleChangeCalle = (event) => {
        setCalle(event.target.value);
    };

    const handleSubmit = (event) => {
        createCliente({
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            correo: correo,
            celular: celular,
            telefono: telefono,
            calle: calle,
            altura: Number(altura),
            provincia: provincia,
            municipio: municipio,
        });
        navigate('/backoffice/clientes');
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Agregar cliente</Typography>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Button type="submit" variant="contained" color="inherit" startIcon={<Iconify icon="eva:save-fill" />}>
                            Guardar
                        </Button>
                        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:close-fill" />} sx={{ ml: 1 }} href="/backoffice/clientes">
                            Cancelar
                        </Button>
                    </Stack>

                </Stack>

                <Grid container>
                    <Grid item xs={12}>
                        <FormControl>
                            <Input type="number" id="dni" aria-describedby="dni-helper" onChange={handleChangeDni} />
                            <FormHelperText id="dni-helper"> Ingrese el dni </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl style={{ marginTop: 20 }}>
                            <Input id="nombre" aria-describedby="nombre-helper" onChange={handleChangeNombre} />
                            <FormHelperText id="nombre-helper"> Ingrese el nombre </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} style={{ marginTop: 20 }}>
                        <FormControl>
                            <Input id="apellido" aria-describedby="apellido-helper" onChange={handleChangeApellido} />
                            <FormHelperText id="apellido-helper"> Ingrese el apellido </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 20 }}>
                        <FormControl>
                            <Input id="correo" aria-describedby="correo-helper" onChange={handleChangeCorreo} />
                            <FormHelperText id="correo-helper" > Ingrese el correo </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3} style={{ marginTop: 20 }}>
                        <FormControl>
                            <Input id="celular" aria-describedby="celular-helper" onChange={handleChangeCelular} />
                            <FormHelperText id="celular-helper"> Ingrese el celular </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} style={{ marginTop: 20 }}>
                        <FormControl>
                            <Input id="telefono" aria-describedby="telefono-helper" onChange={handleChangeTelefono} />
                            <FormHelperText id="telefono-helper"> Ingrese el telefono </FormHelperText>
                        </FormControl>
                    </Grid>

                    {/* Ubicacion */}
                    <Grid item xs={4} style={{ marginTop: 20, width: '100%' }}>
                        <FormControl style={{ width: '90%' }}>
                            <Input id="calle" aria-describedby="calle-helper" multiline onChange={handleChangeCalle} />
                            <FormHelperText id="calle-helper"> Calle </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2} style={{ marginTop: 20 }}>
                        <FormControl style={{ width: '90%' }}>
                            <Input type="number" id="altura" aria-describedby="altura-helper" onChange={handleChangeAltura} />
                            <FormHelperText id="altura-helper"> Altura </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: 20 }}>
                        {provinciasIsLoading == false &&
                            <FormControl style={{ width: '90%' }}>
                                <NativeSelect
                                    id="provincia"
                                    aria-describedby="provincia-helper"
                                    value={provincia}
                                    onChange={handleChangeProvincia}
                                >
                                    {
                                        provincias.map(provincia => (
                                            <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                                        ))
                                    }
                                </NativeSelect>
                                <FormHelperText id="provincia-label">Provincia</FormHelperText>
                            </FormControl>
                        }
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: 20 }}>
                        {municipiosIsLoading == false &&
                            <FormControl>
                                <NativeSelect
                                    id="municipio"
                                    aria-describedby="municipio-helper"
                                    onChange={handleChangeMunicipio}
                                >
                                    {
                                        municipios.map(municipio => (
                                            <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>
                                        ))
                                    }
                                </NativeSelect>
                                <FormHelperText id="municipio-label"> Localidad </FormHelperText>
                            </FormControl>
                        }
                    </Grid>

                </Grid>
            </form>
        </Container>
    );
}
