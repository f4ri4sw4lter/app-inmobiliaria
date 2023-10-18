import { Grid, Typography } from "@mui/material";
import { ImagesCarousel } from "../components";
import { useFetchInmuebleById } from "../hooks/useFetchInmuebleById"
import { Room, Bathroom, MeetingRoom } from "@mui/icons-material";
import { Home } from "@mui/icons-material";


export const InmuebleView = (id) => {

    const { inmueble, isLoading } = useFetchInmuebleById(id);
    const { ubicacion } = inmueble;

    return (
        <>
            <ImagesCarousel />
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant='h4' noWrap component='div' alignItems='center'> {inmueble.titulo} </Typography>
                </Grid>

                <Grid item xs={4}>
                    <Typography variant='h4' noWrap component='div' alignItems='center'> ${inmueble.precio}ARS </Typography>
                </Grid>
                
                <Grid item xs={12}>
                    <Typography 
                        variant='h6' 
                        noWrap 
                        component='div' 
                        alignItems='center'
                        sx={{color:'red'}}> 
                            {inmueble.estado} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    {inmueble.ubicacion &&
                    <Typography 
                        variant='h6' 
                        noWrap 
                        component='div' 
                        alignItems='center'
                        sx={{color:'grey'}}> 
                            {ubicacion['calle']} {ubicacion['altura']}, {ubicacion['ciudad']}, {ubicacion['provincia']}
                    </Typography>}
                </Grid>

                <Grid item xs={8}>
                    <Typography
                        variant='h6'
                        component='div'
                        alignItems='center'>
                            {inmueble.descripcion}
                    </Typography>
                </Grid>

                <Grid container spacing={3} xs={12}>
                    <Grid item xs={4}>
                        <Home sx={{display:'block', ml:4}}/>{inmueble.cant_amb} ambientes
                    </Grid>
                    <Grid item xs={4}>
                        <Bathroom sx={{display:'block', ml:2}}/>{inmueble.cant_ba} baños
                    </Grid>
                    <Grid item xs={4}>
                        <MeetingRoom sx={{display:'block', ml:5}}/>{inmueble.cant_hab} habitaciones
                    </Grid>        
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        variant='h6'
                        component='div'
                        alignItems='center'>
                            <Room /> Ubicacion
                    </Typography>
                    MAPA
                </Grid>
            </Grid>

        </>
    )
}