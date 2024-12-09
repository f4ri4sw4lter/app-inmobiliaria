import { Stack, Typography, Grid, Button } from "@mui/material";
import Iconify from "../../../components/iconify";

export default function ListaRegistrosView() {

    const files = [
        { file: 'inmuebles.log', name: 'Inmuebles' },
        { file: 'contratos.log', name: 'Contratos' },
        { file: 'usuarios.log', name: 'Usuarios' },
        { file: 'clientes.log', name: 'Clientes' },
        { file: 'mensajes.log', name: 'Mensajes' },
        { file: 'imagenes.log', name: 'Imagenes' },
        { file: 'documentos.log', name: 'Documentos' },
    ]

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Lista Registros</Typography>
            </Stack>

            <Grid container spacing={2}>
                {files.map((f) => (
                    <Grid item xs={4} key={f.name}>
                        <a href={"../../../../public/logs/"+f.file} download={f.file} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary" sx={{ border: '1px solid grey', width: '100%' }}
                                startIcon={<Iconify icon="eva:download-fill" />}
                            >
                                {f.name}
                            </Button>
                        </a>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}