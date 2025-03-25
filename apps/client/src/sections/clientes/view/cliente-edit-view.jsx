import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect, FormLabel } from '@mui/material'

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

    const [errorCorreo, setErrorCorreo] = useState(false);

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

    const validarCorreo = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setErrorCorreo(!regex.test(correo)); // Establece error si el correo es inválido
    };

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Editar cliente</Typography>

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
                                <FormLabel id="dni-label">DNI*</FormLabel>
                                <Input type="number" id="dni" value={dni} aria-describedby="dni-helper" onChange={handleChangeDni} required/>
                            </FormControl>
                        </Grid>

                        <Grid item xs={3}>
                            <FormControl style={{ marginTop: 20 }}>
                                <FormLabel id="nombre-label">Nombres*</FormLabel>
                                <Input id="nombre" value={nombre} aria-describedby="nombre-helper" onChange={handleChangeNombre} required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9} style={{ marginTop: 20 }}>
                            <FormControl>
                                <FormLabel id="apllido-label">Apellido*</FormLabel>
                                <Input id="apellido" value={apellido} aria-describedby="apellido-helper" onChange={handleChangeApellido} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={3} style={{ marginTop: 20 }}>
                            <FormControl>
                                <FormLabel id="genero-label">Genero*</FormLabel>
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
                            </FormControl>
                        </Grid>

                        <Grid item xs={9} style={{ marginTop: 20 }}>
                            <FormControl>
                                <FormLabel id="fecha-label">Fecha de nacimiento*</FormLabel>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateField
                                        label=""
                                        onChange={handleChangeFechaNacimiento}
                                        format="DD/MM/YYYY"
                                        value={dayjs(fechaNacimiento)}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4} style={{ marginTop: 20 }}>
                            <FormControl sx={{ width: '90%' }}>
                                <FormLabel id="correo-label">Correo*</FormLabel>
                                <Input 
                                    type="email" 
                                    id="correo" 
                                    value={correo} 
                                    aria-describedby="correo-helper" 
                                    onChange={handleChangeCorreo} 
                                    required
                                    inputProps={{
                                        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
                                        title: 'Ingrese un correo válido'
                                    }}
                                    onBlur={validarCorreo}
                                    sx={{ border: errorCorreo ? '1px solid red' : 'none' }} 
                                />
                                {errorCorreo && <FormHelperText sx={{ color: 'red' }}>Ingrese un correo válido</FormHelperText>}
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} style={{ marginTop: 20 }}>
                            <FormControl sx={{ width: '90%' }}>
                                <FormLabel id="celular-label">Celular*</FormLabel>
                                <Input type="number" id="celular" value={celular} aria-describedby="celular-helper" onChange={handleChangeCelular} required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} style={{ marginTop: 20 }}>
                            <FormControl>
                                <FormLabel id="telefono-label">Telefono*</FormLabel>
                                <Input type="number" id="telefono" value={telefono} aria-describedby="telefono-helper" onChange={handleChangeTelefono} />
                            </FormControl>
                        </Grid>

                        {/* Ubicacion */}
                        <Grid item xs={4} style={{ marginTop: 20, width: '100%' }}>
                            <FormControl style={{ width: '90%' }}>
                                <FormLabel id="calle-label">Calle*</FormLabel>
                                <Input id="calle" value={calle} aria-describedby="calle-helper" multiline onChange={handleChangeCalle} required/>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} style={{ marginTop: 20 }}>
                            <FormControl style={{ width: '90%' }}>
                                <FormLabel id="altura-label">Altura*</FormLabel>
                                <Input type="number" value={altura} id="altura" aria-describedby="altura-helper" onChange={handleChangeAltura} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} style={{ marginTop: 20 }}>
                            {provinciasIsLoading == false &&
                                <FormControl style={{ width: '90%' }}>
                                    <FormLabel id="provincia-label">Provincia*</FormLabel>
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
                                </FormControl>
                            }
                        </Grid>
                        <Grid item xs={3} style={{ marginTop: 20 }}>
                            {municipiosIsLoading == false &&
                                <FormControl>
                                    <FormLabel id="localidad-label">Localidad*</FormLabel>
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
                                </FormControl>
                            }
                        </Grid>

                    </Grid>
                }


            </form>
        </Container>
    );
}
