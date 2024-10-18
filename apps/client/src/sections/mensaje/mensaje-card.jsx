import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { updateMensaje } from '../../helpers/updateMensaje';
import { deleteMensajeById, setNewMensaje, setNoMensajes } from '../../helpers';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getUser } from '../../utils/user';

export default function MensajeCard({
    nombre,
    apellido,
    ciudad,
    telefono,
    correo,
    asunto,
    mensaje,
    propiedad,
    noLeido,
    lector,
    id,
    fetchMensajes,
    lista
}) {

    const User = getUser();

    const [open, setOpen] = useState(null);

    const [openDialog, setOpenDialog] = useState(false);

    const handleChange = (isReaded) => {
        updateMensaje({
            nombre,
            apellido,
            ciudad,
            telefono,
            correo,
            asunto,
            mensaje,
            propiedad,
            noLeido,
            lector,
            id
        });
        fetchMensajes();
        console.log(lista.length)
        if(!isReaded) {
            setNewMensaje();
        } else if (isReaded && lista.length <= 1) {
            setNoMensajes();
        }
    }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        handleCloseMenu();
    };

    const handleConfirmDialog = () => {
        deleteMensajeById(id);
        setOpenDialog(false);
        setOpen(null);
        fetchMensajes();
    };


    return (
        <>
            <Card sx={{ minWidth: 275, border: '1px solid #ccc', marginBottom: 2 }}>
                <CardContent>
                    <Stack direction="row" alignItems="left" justifyContent="space-between" mb={2}>

                        <Typography variant="h5" component="h2">
                            {apellido} {nombre} ({ciudad})
                        </Typography>
                        {lector != '' &&
                            <Typography color="textSecondary" gutterBottom>
                                Leido por {lector}
                            </Typography>
                        }

                    </Stack>
                    <Typography color="textSecondary" gutterBottom>
                        {correo} | {telefono}
                    </Typography>
                    <Typography color="textSecondary">
                        {asunto}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {mensaje}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        noLeido == 'true' &&
                        <Button size="small" onClick={() => handleChange(true)}>Marcar como Leido</Button>
                    }
                    {
                        (noLeido == 'false' && User.role <= 1) &&
                        <Button size="small" onClick={() => handleChange(false)}>Marcar como NO Leido</Button>
                    }
                    {
                        noLeido == 'false' &&
                        <Button size="small" color="error" onClick={handleClickOpenDialog}>Eliminar mensaje</Button>
                    }
                </CardActions>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Confirmación</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Estás seguro de que deseas borrar este mensaje?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmDialog} color="primary">
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>

        </>

    )
}