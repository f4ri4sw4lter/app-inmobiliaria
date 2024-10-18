import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, IconButton, Input, FormControl, FormHelperText, Stack, Grid } from '@mui/material';
import Iconify from '../../components/iconify';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { createDoc } from '../../helpers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getUser } from '../../utils/user';

export const ModalCreateDocs = ({ fetchDocs, reference, ownerId }) => {

    const User = getUser();

    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [name, setName] = useState('');

    useEffect(() => {
        if (isUpload) {
            fetchDocs(ownerId);
            setIsUpload(false);
        }
    }, [isUpload])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setDisabled(true);
        setName('');
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setName(event.target.files[0].name)
        setDisabled(false);
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleSubmit = async () => {
        if (selectedFile) {
            const id = ownerId ? ownerId : User.lastname + ' ' + User.name;
            
            try {
                await createDoc(reference, ownerId, name, selectedFile, setIsUpload)
                await fetchDocs(ownerId);
                handleClose();

            } catch (error) {

                console.error('Error subiendo el documento:', error);
                alert('Error subiendo documento');

            }

        } else {
            alert('Por favor seleccione un documento');
        }
    };

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    return (
        <>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid></Grid>
                <Grid>
                    <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} onClick={handleOpen} >
                        Subir Documento
                    </Button>

                </Grid>
            </Grid>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 450,
                        bgcolor: 'background.paper',
                        border: '1px solid black',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2
                    }}
                >
                    <div>

                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        {selectedFile &&
                            <Typography
                                variant="h5"
                                style={{ color: 'green', center: 'center', textAlign: 'center' }}>
                                Archivo seleccionado
                                <CheckIcon style={{ verticalAlign: 'middle', marginRight: 4 }} />
                            </Typography>
                        }

                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <Button variant="contained" onClick={handleButtonClick}>
                            Seleccionar Documento
                        </Button>
                        <FormControl sx={{ width: '50%', marginTop: 5 }}>
                            <Input id="name" aria-describedby="name-helper" disabled={disabled} onChange={handleChangeName} value={name} />
                            <FormHelperText id="name-helper"> Ingrese el codigo del archivo </FormHelperText>
                        </FormControl>

                        <Button sx={{ width: '40%', marginTop: 5 }} variant="contained" color={selectedFile ? "primary" : "secondary"} disabled={disabled} onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                            Subir Documento
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    )
}