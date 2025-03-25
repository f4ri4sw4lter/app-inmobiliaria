import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect, FormLabel } from '@mui/material'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

import Iconify from '../../../components/iconify';

import { createCliente } from '../../../helpers/createCliente';
import { useFetchProvincias } from '../../../hooks/useFetchProvincias';
import { useFetchMunicipios } from '../../../hooks/useFetchMunicipios';
import generos from '../../../utils/generos';
export default function ClienteCreateView() {

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
        if(event.target.value.length <= 8){
            setDni(event.target.value);
        } else {
            return;
        }
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
            genero: genero,
            fechaNacimiento: fechaNacimiento
        });
        navigate('/backoffice/clientes');
    }

    const validarCorreo = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setErrorCorreo(!regex.test(correo)); // Establece error si el correo es inválido
    };

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
                            <FormLabel id="dni-label">DNI*</FormLabel>
                            <Input 
                                type="number" 
                                id="dni" 
                                aria-describedby="dni-helper" 
                                onChange={handleChangeDni}
                                inputProps={{
                                    maxLength: 8,
                                    max: 99999999,
                                }}
                                value={dni}
                                required
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl style={{ marginTop: 20 }}>
                            <FormLabel id="nombre-label">Nombres*</FormLabel>
                            <Input id="nombre" aria-describedby="nombre-helper" onChange={handleChangeNombre} required/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={9} style={{ marginTop: 20 }}>
                        <FormControl>
                            <FormLabel id="apellido-label">Apellido*</FormLabel>
                            <Input id="apellido" aria-describedby="apellido-helper" onChange={handleChangeApellido} required/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} style={{ marginTop: 20 }}>
                        <FormControl>
                            <FormLabel id="genero-label">Genero*</FormLabel>
                            <NativeSelect
                                id="genero"
                                aria-describedby="genero-helper"
                                onChange={handleChangeGenero}
                                required
                            >
                                <option key="default" value="">Seleccione una opción</option>
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
                                    required
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={4} style={{ marginTop: 20 }}>
                        <FormControl sx={{width: '90%'}}>
                            <FormLabel id="correo-label">Correo*</FormLabel>
                            <Input 
                                id="correo" 
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
                        <FormControl sx={{width: '90%'}}>
                            <FormLabel id="celular-label">Celular*</FormLabel>
                            <Input type="number" id="celular" aria-describedby="celular-helper" onChange={handleChangeCelular} required/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} style={{ marginTop: 20 }}>
                        <FormControl>
                            <FormLabel id="telefono-label">Telefono</FormLabel>
                            <Input type="number" id="telefono" aria-describedby="telefono-helper" onChange={handleChangeTelefono}/>
                        </FormControl>
                    </Grid>

                    {/* Ubicacion */}
                    <Grid item xs={4} style={{ marginTop: 20, width: '100%' }}>
                        <FormControl style={{ width: '90%' }}>
                            <FormLabel id="calle-label">Calle*</FormLabel>
                            <Input id="calle" aria-describedby="calle-helper" multiline onChange={handleChangeCalle} required/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={1} style={{ marginTop: 20 }}>
                        <FormControl style={{ width: '90%' }}>
                            <FormLabel id="altura-label">Altura*</FormLabel>
                            <Input type="number" id="altura" aria-describedby="altura-helper" onChange={handleChangeAltura} required/>
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
                                    default=""
                                    required
                                >
                                    <option key="" value="" disabled>Seleccion una provincia</option>
                                    {
                                        provincias.map(provincia => (
                                            <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
                                        ))
                                    }
                                </NativeSelect>
                            </FormControl>
                        }
                    </Grid>
                    <Grid item xs={4} style={{ marginTop: 20 }}>
                        {municipiosIsLoading == false &&
                            <FormControl>
                                <FormLabel id="localidad-label">Localidad*</FormLabel>
                                <NativeSelect
                                    id="municipio"
                                    aria-describedby="municipio-helper"
                                    onChange={handleChangeMunicipio}
                                    default=""
                                    required
                                >
                                    <option key="" value="" disabled>Seleccione una localidad</option>
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
            </form>
        </Container>
    );
}
