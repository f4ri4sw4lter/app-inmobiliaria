import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";

import NotFoundPage from '../pages/page-not-found';
import { ListaMensajesView } from '../sections/mensaje/view';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function MensajePage() {

    const { accion, id } = useParams();

    const [isNoLeidos, setIsNoLeidos] = useState(true);

    function handleNoLeidos() {
        setIsNoLeidos(true);
    }

    function handleLeidos() {
        setIsNoLeidos(false);
    }

    function SeleccionarVista(noLeidos) {
        if (typeof accion == 'undefined') {
            return (<ListaMensajesView noLeidos={isNoLeidos}/>)
        } else {
            if (accion == 'crear') {
                return (<ListaMensajesView />)
            }
            if (accion == 'ver') {
                return (
                    <ListaMensajesView />
                )
            }
            else if (accion == 'editar') {
                return (
                    <ListaMensajesView />
                )
            }
            else {
                return (<NotFoundPage />)
            }
        }
    }

    return (
        <>
            <Helmet>
                <title> Mensajes </title>
            </Helmet>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Lista Mensajes</Typography>
            </Stack>
            <Stack direction="row" alignItems="left" justifyContent="left" mb={5}>
                <Button
                    variant="contained"
                    color={isNoLeidos ? "primary" : "grey"}
                    sx={{ width: '10%', mr: '10px', border: '1px solid #ccc' }}
                    onClick={handleNoLeidos}
                >No leidos</Button>
                <Button
                    variant="contained"
                    color={!isNoLeidos ? "primary" : "grey"}
                    sx={{ width: '10%', border: '1px solid #ccc' }}
                    onClick={handleLeidos}
                >Leidos</Button>
            </Stack>

            <SeleccionarVista />
        </>
    );
}
