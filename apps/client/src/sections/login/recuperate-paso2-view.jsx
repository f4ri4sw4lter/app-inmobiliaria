import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useRouter } from '../../routes/hooks';

import { bgGradient } from '../../theme/css';

import Logo from '../../components/logo';
import { resetPassword } from '../../helpers';

// ----------------------------------------------------------------------

export default function RecuperatePaso2View({ setIsLogged, emailToReset }) {
    const theme = useTheme();
    const router = useRouter();

    const [nuevaPass, setNuevaPass] = useState('');
    const [validate, setValidate] = useState('');
    const [codigo, setCodigo] = useState('');
    const [severity, setSeverity] = useState('success');
    const [alertTitle, setAlertTitle] = useState('OK');
    const [alertMessage, setAlertMessage] = useState('Contraseña actualizada');
    const [open, setOpen] = useState(false)

    const handleSubmit = async (event) => {

        try{

            const resp = await resetPassword({
                nuevaPass: nuevaPass,
                validate: validate,
                codigo: codigo,
                email: emailToReset
            });

            setSeverity('success');
            setAlertTitle('OK');
            setAlertMessage('Contraseña actualizada');
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                router.push(/login/)
            }, 5000);

        } catch (err) {

            setSeverity('error');
            setAlertTitle('ERROR');
            setAlertMessage('Error con el codigo');
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }

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

            <Button
                fullWidth
                size="large"
                type="button"
                variant="contained"
                color="error"
                sx={{ marginTop: 1 }}
                href='/'
                onClick={() => {router.push(/login/)}}
            >
                Cancelar
            </Button>

            <br />
            {open &&
                <Stack sx={{ width: '100%', alignItems: 'center', marginTop: 5 }} spacing={2}>       
                    <Alert severity={severity}>
                        <AlertTitle>{alertTitle}</AlertTitle>
                        {alertMessage}
                    </Alert>
                </Stack>
            }
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

            <Stack alignItems="center" justifyContent="center" sx={{ height: 1, position: 'relative' }}>
                
                <Card
                    sx={{
                        p: 5,
                        width: 1,
                        maxWidth: 420,
                    }}
                >
                    <Typography variant="h4">Reinicio de constraseña</Typography><br />
                    <Typography variant="h9" style={{ fontSize: '16px', color: 'red' }}>Se envio un correo con el codigo de reinicio de contraseña (si no encuentra el correo, revise la bandeja de spam).</Typography><br />
                    <br />
                    <br />
                    {renderForm}
                </Card>
            </Stack>
        </Box>

    );

}