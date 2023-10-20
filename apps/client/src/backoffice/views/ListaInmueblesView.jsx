import { useFetchListaInmuebles } from "../hooks/useFetchListaInmuebles";
import { Box, Grid, Typography, IconButton, Button } from "@mui/material"
import { StarOutline, AddOutlined } from "@mui/icons-material"
import { DataGrid } from '@mui/x-data-grid';
import { Link, Navigate } from "react-router-dom";
import { BotoneraDataGrid } from "../components";
import { useTable } from 'react-table';

export const ListaInmueblesView = () => {

    const { listaInmuebles, isLoading } = useFetchListaInmuebles();

    const columns = [
        {
            field: 'acciones',
            headerName: 'Acciones',
            width: 250,
            renderCell: (params) => {
                return (
                    <BotoneraDataGrid inmueble={params.row} />
                )
            },
        },
        {
            field: 'tipo',
            headerName: 'Tipo de contrato',
            width: 150
        },
        {
            field: 'titulo',
            headerName: 'Titulo del inmueble',
            width: 150
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            width: 340
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 110
        },
        {
            field: 'propietario',
            headerName: 'DNI del propietario',
            width: 150
        }
    ];

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: '', borderRadius: 3 }}
        >

            <Grid item xs={12} >
                <Box sx={{ height: 400, width: '100%', borderColor: 'white', color: 'white' }}>
                    <DataGrid
                        rows={listaInmuebles}
                        columns={columns}
                        disableRowSelectionOnClick
                        disableVirtualization
                        editMode='row'
                        getRowId={(row) => row._id}

                    />
                </Box>
                <IconButton
                    size='large'
                    sx={{
                        color: 'white',
                        backgroundColor: 'error.main',
                        ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                        position: 'fixed',
                        right: 50,
                        bottom: 50
                    }}

                >
                    <AddOutlined sx={{ fontSize: 30 }} />
                </IconButton>
            </Grid>

        </Grid>
    )
    
}
