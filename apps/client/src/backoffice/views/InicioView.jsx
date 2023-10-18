import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const InicioView = () => {
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={ 39 } fontWeight='light'> 28 de agosto, 2023 </Typography>
            </Grid>
            <Grid item>
                <Button color='primary' sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='Ingrese un titulo'
                    label='titulo'
                    sx={{ border: 'none', mb: 1 }}
                />

                <TextField 
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='¿Que sucedio el dia de hoy?'
                    minRows={ 5 }
                />
            </Grid>

            <ImageGallery />

        </Grid>
    )
}
