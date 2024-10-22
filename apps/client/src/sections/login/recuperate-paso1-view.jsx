import { useEffect, useState } from 'react';
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

import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import { useFetchResetPass } from '../../hooks/useFetchResetPass';

// ----------------------------------------------------------------------

export default function RecuperatePaso1View({ setIsLogged, setEmailToReset }) {

    const theme = useTheme();
    const router = useRouter();

    const { respMail, isLoadingMail, recuperarPass } = useFetchResetPass();
    const [ email, setEmail] = useState('');
    const [ error, setError] = useState(false);

    const handleSubmit = async (event) => {
        await recuperarPass({mail: email})
    };

    useEffect(() => {
        if(!isLoadingMail){
            if(respMail.status == 200){
                setEmailToReset(email);
                router.push('/login/2');
            } else {
                setError(true)
            }
        }
    }, [respMail, isLoadingMail])


    const renderForm = (
        <>
            <Stack spacing={3}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    <Typography variant="h4">Recuperar cuenta</Typography>
                    <Typography variant="h9" style={{ fontSize: '14px' }}>Ingrese el correo electronico con el que se registro. Se le enviara un codigo para restablecer la contraseña.</Typography>
                    <br />
                    <br />
                    {( !isLoadingMail && error) && <Typography variant="h9" style={{ fontSize: '14px', color: 'red' }}>El correo no existe</Typography>}
                    {renderForm}
                </Card>
            </Stack>
        </Box>
    );
}
