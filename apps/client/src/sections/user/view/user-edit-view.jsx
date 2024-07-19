import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Stack, Button, Container, Typography, Grid, FormControl, FormHelperText, Input, NativeSelect, FormLabel } from '@mui/material'

import Iconify from '../../../components/iconify';

import { roles } from '../../../utils/roles';

import { updateUser } from '../../../helpers/';
import { useFetchUserById } from '../../../hooks/useFetchUserById';

// ----------------------------------------------------------------------

export default function UserEditView() {

    const { accion, id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState('');

    const [lastname, setLastname] = useState('');

    const [email, setEmail] = useState('');

    const [roleName, setRoleName] = useState('');

    const [roleLevel, setRoleLevel] = useState('');

    const { user, userIsLoading } = useFetchUserById(id);

    const handleChangeName = (event) => {
        setName(event.target.value);
    };
    const handleChangeLastname = (event) => {
        setLastname(event.target.value);
    };
    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
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
        updateUser({
            id: id,
            name: name,
            lastname: lastname,
            email: email,
            roleName: roleName,
            roleLevel: roleLevel,
        });
        navigate('/backoffice/users');
    }

    useEffect(() => {
        if (!userIsLoading) {
            setName(user.name);
            setLastname(user.lastname);
            setEmail(user.email);
            setRoleName(user.role.name);
            setRoleLevel(user.role.level);
        }
    }, [userIsLoading])

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
                    {userIsLoading
                        ? <p>Cargando...</p>
                        : <>
                            <Grid item xs={3}>
                                <FormControl sx={{ width: '90%' }}>
                                    <FormLabel id="lastname-label">Apellido</FormLabel>
                                    <Input value={lastname} placeholder="Gomez" id="lastname" aria-describedby="lastname-helper" onChange={handleChangeLastname} />
                                    <FormHelperText id="lastname-helper"> Ingrese el Apellido </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={9}>
                                <FormControl sx={{ width: '30%' }}>
                                    <FormLabel id="name-label">Nombre</FormLabel>
                                    <Input value={name} placeholder="Juan" id="name" aria-describedby="name-helper" onChange={handleChangeName} />
                                    <FormHelperText id="name-helper"> Ingrese el Nombre </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl sx={{ width: '90%', marginTop: '20px' }}>
                                    <FormLabel id="email-label">Correo</FormLabel>
                                    <Input value={email} placeholder="ejemplo@gmail.com" id="email" aria-describedby="email-helper" onChange={handleChangeEmail} />
                                    <FormHelperText id="email-helper"> Ingrese el correo </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={9}>
                                <FormControl sx={{ width: '30%', marginTop: '20px' }}>
                                    <FormLabel id="password-label">Contraseña</FormLabel>
                                    <Input disabled value="" placeholder="******" id="password" type="password" aria-describedby="password-helper" />
                                    <FormHelperText id="password-helper"> No se puede modificar la contraseña aquí </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} style={{ marginTop: '20px' }}>
                                <FormControl>
                                    <FormLabel id="role-label">Rol</FormLabel>
                                    <NativeSelect
                                        id="contrato"
                                        aria-describedby="titulo-helper"
                                        onChange={handleChangeRoleLevel}
                                        value={roleLevel}
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

                        </>
                    }

                </Grid>
            </form>
        </Container>
    );
}
