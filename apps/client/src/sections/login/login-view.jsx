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
import Iconify from '../../components/iconify';
import { login } from '../../helpers/login'
import { getConfig } from '../../helpers/getConfig';
import { setConfig } from '../../utils';

// ----------------------------------------------------------------------

export default function LoginView({ setIsLogged }) {

  const theme = useTheme();

  const router = useRouter();

  const [userIsLoading, setUserIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFailLogin, setIsFailLogin] = useState(false);

  const handleSubmit = async (event) => {

    try{
      const user = await login({email, password})
      setUserIsLoading(true);

      if(user.status === 401){

        setIsFailLogin(true);
        return;
  
      } 

      if(user){

        setIsLogged(true);
        Cookies.set('User', JSON.stringify(user), { expires: 1 });
  
        const config = await getConfig();

        if (config) {

          setConfig(config)
          router.push('/backoffice');
        
        }  

      }

    } catch (err) {

      console.log(err)
      setIsFailLogin(true);

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
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover" href="/login/1">
          Olvidaste tu contraseña?
        </Link>
      </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
          onClick={handleSubmit}
        >
          Entrar
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

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        

        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <img
            src="../../assets/login-logo.png"
            alt="Imagen de encabezado"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
          <Typography variant="h4"
            sx={{
              textAlign: 'center',}}
          >
            Iniciar sesion
          </Typography>
          <br />
          {isFailLogin &&
            <>
            <Typography variant="h8" style={{color: 'red'}}>Credenciales invalidas</Typography>
            <br/>
            <br />
            </>
          }
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
