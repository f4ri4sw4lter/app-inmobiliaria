import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect } from '@mui/material'

import Iconify from '../../../components/iconify';

import { updateCliente } from '../../../helpers/updateCliente';
import { useFetchProvincias } from '../../../hooks/useFetchProvincias';
import { useFetchMunicipios } from '../../../hooks/useFetchMunicipios';
import { useFetchClienteById } from '../../../hooks/useFetchClienteById';
import generos from '../../../utils/generos';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from "dayjs";

export default function ClienteEditView() {

    const { accion, id } = useParams();

    const { cliente, clienteIsLoading } = useFetchClienteById(id);

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

    const [fechaNacimiento, setFechaNacimiento] = useState('');

    const [genero, setGenero] = useState('');


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
    const handleChangeCalle = (event) => {
        setCalle(event.target.value);
    };
    const handleChangeFechaNacimiento = (date) => {
        setFechaNacimiento(date);
    }
    const handleChangeGenero = (event) => {
        setGenero(event.target.value);
    };

    const handleSubmit = (event) => {
        updateCliente({
            id: id,
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
            genero: genero,
            fechaNacimiento: fechaNacimiento
        });
        navigate('/backoffice/clientes');
    }

    useEffect(() => {
        if (!clienteIsLoading) {
            setDni(cliente.dni);
            setNombre(cliente.nombre);
            setApellido(cliente.apellido);
            setCorreo(cliente.correo);
            setCelular(cliente.celular);
            setTelefono(cliente.telefono);
            setCalle(cliente.ubicacion['calle']);
            setAltura(parseInt(cliente.ubicacion['altura'], 10));
            setMunicipio(cliente.ubicacion['municipio']);
            setProvincia(cliente.ubicacion['provincia']);
            fetchMunicipios(cliente.ubicacion['provincia']);
            setGenero(cliente.genero);
            setFechaNacimiento(cliente.fechaNacimiento);
        }
    }, [clienteIsLoading])

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

                {clienteIsLoading == false &&
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl>
                                <Input id="dni" value={dni} aria-describedby="dni-helper" onChange={handleChangeDni} />
                                <FormHelperText id="dni-helper"> DNI </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl style={{ marginTop: 20 }}>
                                <Input id="nombre" value={nombre} aria-describedby="nombre-helper" onChange={handleChangeNombre} />
                                <FormHelperText id="nombre-helper"> Nombres </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9} style={{ marginTop: 20 }}>
                            <FormControl>
                                <Input id="apellido" value={apellido} aria-describedby="apellido-helper" onChange={handleChangeApellido} />
                                <FormHelperText id="apellido-helper"> Apellidos </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3} style={{ marginTop: 20 }}>
                            <FormControl>
                                <NativeSelect
                                    id="genero"
                                    aria-describedby="genero-helper"
                                    onChange={handleChangeGenero}
                                    value={genero}
                                >
                                    {
                                        generos.map(genero => (
                                            <option key={genero.id} value={genero.label}>{genero.label}</option>
                                        ))
                                    }
                                </NativeSelect>
                                <FormHelperText id="municipio-label"> Genero </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9} style={{ marginTop: 20 }}>
                            <FormControl>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateField
                                        label="Fecha de Nacimiento"
                                        onChange={handleChangeFechaNacimiento}
                                        format="DD/MM/YYYY"
                                        value={dayjs(fechaNacimiento)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4} style={{ marginTop: 20 }}>
                            <FormControl sx={{ width: '90%' }}>
                                <Input id="correo" value={correo} aria-describedby="correo-helper" onChange={handleChangeCorreo} />
                                <FormHelperText id="correo-helper" > Correo </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} style={{ marginTop: 20 }}>
                            <FormControl>
                                <Input id="celular" value={celular} aria-describedby="celular-helper" onChange={handleChangeCelular} />
                                <FormHelperText id="celular-helper"> Celular </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} style={{ marginTop: 20 }}>
                            <FormControl>
                                <Input id="telefono" value={telefono} aria-describedby="telefono-helper" onChange={handleChangeTelefono} />
                                <FormHelperText id="telefono-helper"> Telefono </FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* Ubicacion */}
                        <Grid item xs={4} style={{ marginTop: 20, width: '100%' }}>
                            <FormControl style={{ width: '90%' }}>
                                <Input id="calle" value={calle} aria-describedby="calle-helper" multiline onChange={handleChangeCalle} />
                                <FormHelperText id="calle-helper"> Calle </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} style={{ marginTop: 20 }}>
                            <FormControl style={{ width: '90%' }}>
                                <Input type="number" value={altura} id="altura" aria-describedby="altura-helper" onChange={handleChangeAltura} />
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
                                        value={municipio}
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
                }


            </form>
        </Container>
    );
}
