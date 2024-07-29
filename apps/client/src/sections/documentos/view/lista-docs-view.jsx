import { Stack, Typography, Grid, Button } from "@mui/material";
import ListaDocs from "../lista-docs";

export default function ListaDocsView() {

    return (
        <>
            <Typography variant="h4">Lista de Documentos</Typography>
            <ListaDocs data={''} />
        </>
    )
}