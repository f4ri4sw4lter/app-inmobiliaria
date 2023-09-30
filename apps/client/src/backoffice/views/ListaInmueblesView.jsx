import { StarOutline } from "@mui/icons-material"
import { Box, Grid, Typography } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { getListaInmuebles } from '../helpers/'
import { useEffect, useState } from "react";
import { useFetchListaInmuebles } from "../hooks/useFetchListaInmuebles";

export const ListaInmueblesView = () => {

    const { listaInmuebles, isLoading } = useFetchListaInmuebles();

    const columns = [
        {
            field: 'titulo',
            headerName: 'Titulo',
            width: 150
        },
        {
            field: 'descripcion',
            headerName: 'Descripcion',
            width: 500
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 110
        }
    ];

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3 }}
        >

            <Grid item xs={12} >
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={listaInmuebles}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        getRowId={(row) => row._id}
                        sx={{ color: 'white' }}
                    />
                </Box>
            </Grid>

        </Grid>
    )
}
