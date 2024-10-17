import { useEffect, useState } from 'react';
import { User } from '../../utils/user';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import Cookies from 'js-cookie';
import { Snackbar, Alert } from '@mui/material';

import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import { resetPassword } from '../../helpers';

// ----------------------------------------------------------------------

export default function RecuperatePaso2View({ setIsLogged, setUser, emailToReset }) {

    const theme = useTheme();
    const router = useRouter();

    const [nuevaPass, setNuevaPass] = useState('');
    const [validate, setValidate] = useState('');
    const [codigo, setCodigo] = useState('');

    const handleSubmit = async (event) => {

        const resp = await resetPassword({
            nuevaPass: nuevaPass,
            validate: validate,
            codigo: codigo,
            email: emailToReset
        });

        console.log(resp)

    };



    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="nuevaPass"
                    label="Nueva contraseña"
                    name="nuevaPass"
                    autoComplete="nuevaPass"
                    autoFocus
                    value={nuevaPass}
                    onChange={(e) => setNuevaPass(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="validate"
                    label="Validacion de nueva contraseña"
                    name="validate"
                    autoComplete="validate"
                    autoFocus
                    value={validate}
                    onChange={(e) => setValidate(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="codigo"
                    label="Codigo de reinicio"
                    name="codigo"
                    autoComplete="codigo"
                    autoFocus
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
            </Stack>
            <br />
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="inherit"
                onClick={handleSubmit}
            >
                Enviar
            </LoadingButton>
        </>
    );

    return (
        <Box
            sx={{
                ...bgGradient({
                    color: alpha(theme.palette.background.default, 0.9),
                    imgUrl: '/assets/background/overlay_4.jpg',
                }),
                height: 1,
            }}
        >
            <Logo
                sx={{
                    position: 'fixed',
                    top: { xs: 16, md: 24 },
                    left: { xs: 16, md: 24 },
                }}
            />

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Reinicio de constraseña</Typography><br/>
                    <Typography variant="h9" style={{ fontSize: '16px', color: 'red' }}>Se envio un correo con el codigo de reinicio de contraseña (si no encuentra el correo, revise la bandeja de spam).</Typography><br/>
                    <br />
                    <br />
                    {renderForm}
                </Card>
            </Stack>
             
            <Snackbar open={open} autoHideDuration={6000} 
                //</Box>onClose={handleClose}
            >
            <Alert
            //onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
            >
            This is a success Alert inside a Snackbar!
            </Alert>
            </Snackbar>
        </Box>

    );

}