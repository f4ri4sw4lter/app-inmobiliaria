import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";

import NotFoundPage from '../pages/page-not-found';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import ListaRegistrosView from '../sections/registros/view/lista-registros-view';

// ----------------------------------------------------------------------

export default function RegistrosPage() {

    return (
        <>
            <Helmet>
                <title> Registros </title>
            </Helmet>

            <ListaRegistrosView />
        </>
    );
}
