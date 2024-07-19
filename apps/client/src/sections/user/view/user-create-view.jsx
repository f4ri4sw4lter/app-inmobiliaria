import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect, FormLabel } from '@mui/material'

import { roles } from '../../../utils/roles';

import Iconify from '../../../components/iconify';

import { createUser } from '../../../helpers/';

// ----------------------------------------------------------------------

export default function UserCreateView() {

    const navigate = useNavigate();

    const [name, setName] = useState('');

    const [lastname, setLastname] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [roleName, setRoleName] = useState('');

    const [roleLevel, setRoleLevel] = useState('');


    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    };
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const handleChangeRoleName = (level) => {
        const role = roles.find(role => role.level === level);
        setRoleName(role.name);
    };
    const handleChangeRoleLevel = (event) => {
        setRoleLevel(event.target.value);
        handleChangeRoleName(event.target.value)
    };

    const handleSubmit = (event) => {
        createUser({
            name: name,
            lastname: lastname,
            email: email,
            password: password,
            roleName: roleName,
            roleLevel: roleLevel,
        });
        navigate('/backoffice/users');
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4">Crear usuario</Typography>

                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Button type="submit" variant="contained" color="inherit" startIcon={<Iconify icon="eva:save-fill" />}>
                            Guardar
                        </Button>
                        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:close-fill" />} sx={{ ml: 1 }} href="/backoffice/users">
                            Cancelar
                        </Button>
                    </Stack>

                </Stack>

                <Grid container>
                    <Grid item xs={3}>
                        <FormControl sx={{ width: '90%' }}>
                            <FormLabel id="lastname-label">Apellido</FormLabel>
                            <Input placeholder="Gomez" id="lastname" aria-describedby="lastname-helper" onChange={handleChangeLastname} />
                            <FormHelperText id="lastname-helper"> Ingrese el Apellido </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={9}>
                        <FormControl sx={{ width: '30%' }}>
                            <FormLabel id="name-label">Nombre</FormLabel>
                            <Input placeholder="Juan" id="name" aria-describedby="name-helper" onChange={handleChangeName} />
                            <FormHelperText id="name-helper"> Ingrese el Nombre </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={3}>
                        <FormControl sx={{ width: '90%', marginTop: '20px' }}>
                            <FormLabel id="email-label">Correo</FormLabel>
                            <Input placeholder="ejemplo@gmail.com" id="email" aria-describedby="email-helper" onChange={handleChangeEmail} />
                            <FormHelperText id="email-helper"> Ingrese el correo </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={9}>
                        <FormControl sx={{ width: '30%', marginTop: '20px' }}>
                            <FormLabel id="password-label">Contraseña</FormLabel>
                            <Input placeholder="******" id="password" type="password" aria-describedby="password-helper" onChange={handleChangePassword} />
                            <FormHelperText id="password-helper"> Ingrese la Contraseña </FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: '20px' }}>
                        <FormControl>
                            <FormLabel id="role-label">Rol</FormLabel>
                            <NativeSelect
                                id="contrato"
                                aria-describedby="titulo-helper"
                                defaultValue="Alquiler"
                                onChange={handleChangeRoleLevel}
                            >
                                {
                                    roles.map((rol) => (
                                        <option key={rol.name} value={rol.level}>{rol.name}</option>
                                    ))
                                }
                            </NativeSelect>
                            <FormHelperText id="contrato-label">Seleccione un rol</FormHelperText>
                        </FormControl>
                    </Grid>





                </Grid>
            </form>
        </Container>
    );
}
