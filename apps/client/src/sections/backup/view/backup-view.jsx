import { Stack, Typography, Grid, Button } from "@mui/material";
import Iconify from "../../../components/iconify";
import { createBackup } from "../../../helpers/createBackup";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getConfig } from '../../../utils/';
import { set } from "lodash";
import { recuperateBackup } from "../../../helpers/recuperateBackup";

const Config = getConfig();

export default function BackupView() {

    const [ creatingBackup, setCreatingBackup ] = useState(false);
    const [ backupCreated, setBackupCreated ] = useState({status: 'none'});
    const [ recuperatingBackup, setRecuperatingBackup ] = useState(false);
    const [ backupRecuperated, setBackupRecuperated ] = useState({status: 'none'});

    const fetchCreateBackup = async () => {
        setCreatingBackup(true);
        setBackupCreated({status: 'waiting'});
        await createBackup(setCreatingBackup, setBackupCreated)
    }

    const fetchRecuperateBackup = async () => {
        setRecuperatingBackup(true);
        setBackupRecuperated({status: 'waiting'});
        await recuperateBackup(setRecuperatingBackup, setBackupRecuperated)
    }

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Backup del sistema</Typography>
            </Stack>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="H1">
                        Ultimo backup: {Config.lastBackup}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ border: '1px solid grey' }}
                        startIcon={<Iconify icon="eva:download-fill" />}
                        onClick={fetchCreateBackup}
                        disabled={creatingBackup}
                    >
                        Crear Backup
                    </Button>
                    
                </Grid>
                <Grid item xs={1}>
                    {creatingBackup &&
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    }
                    {backupCreated && backupCreated.status === 'created' &&
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="body2" sx={{ color: 'green' }}>
                            Backup creado
                        </Typography>
                        <Iconify icon="eva:checkmark-fill" sx={{ color: 'green', width: 33, height: 33 }}/>
                    </Box>
                    }
                    {backupCreated && backupCreated.status === 'error' &&
                    <Box sx={{ display: 'flex' }}>
                        <Iconify icon="eva:alert-triangle-fill" sx={{ color: 'red', width: '66px', height: '66px' }}/>
                        <Typography variant="body2" sx={{ color: 'red' }}>
                            Error al crear el backup
                        </Typography>
                    </Box>
                    }
                </Grid>

                <Grid item xs={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ border: '1px solid grey' }}
                        startIcon={<Iconify icon="eva:upload-fill" />}
                        onClick={fetchRecuperateBackup}
                        disabled={recuperatingBackup}
                    >
                        Reestablecer ultimo Backup
                    </Button>
                </Grid>
                <Grid item xs={1}>
                    {recuperatingBackup &&
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                    }
                    {backupRecuperated && backupRecuperated.status === 'recuperated' &&
                    <Box sx={{ display: 'flex' }}>
                        <Typography variant="body2" sx={{ color: 'green' }}>
                            Recuperacion exitosa
                        </Typography>
                        <Iconify icon="eva:checkmark-fill" sx={{ color: 'green', width: 33, height: 33 }}/>
                    </Box>
                    }
                    {backupRecuperated && backupRecuperated.status === 'error' &&
                    <Box sx={{ display: 'flex' }}>
                        <Iconify icon="eva:alert-triangle-fill" sx={{ color: 'red', width: '66px', height: '66px' }}/>
                        <Typography variant="body2" sx={{ color: 'red' }}>
                            Error al recuperar el backup
                        </Typography>
                    </Box>
                    }
                </Grid>
            </Grid>


        </>
    )
}