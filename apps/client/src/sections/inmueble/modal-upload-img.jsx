import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Typography, IconButton  } from '@mui/material';
import Iconify from '../../components/iconify';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { createImage } from '../../helpers/createImage';

export const ModalUploadImg = ({ id, fetchImages }) => {

    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUpload, setIsUpload] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        if (isUpload) {
            fetchImages();
            setIsUpload(false);
        }
    }, [isUpload])

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setDisabled(true);
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setDisabled(false);
    };

    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleSubmit = async () => {
        if (selectedFile) {

            try {
                await createImage('propiedad', selectedFile, id, setIsUpload)
                handleClose();

            } catch (error) {

                console.error('Error subiendo la imagen:', error);
                alert('Error subiendo la imagen');

            }

        } else {
            alert('Por favor selecciona una imagen');
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" startIcon={<Iconify icon="eva:upload-fill" />} onClick={handleOpen}>
                Agregar foto
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
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
                                    Imagen seleccionada
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
                                Seleccionar Imagen
                            </Button>
                            <Button variant="contained" color="primary" disabled={disabled} onClick={handleSubmit} style={{ marginLeft: '10px' }}>
                                Subir Imagen
                            </Button>
                        </div>
                </Box>
            </Modal>
        </>
    );
};
