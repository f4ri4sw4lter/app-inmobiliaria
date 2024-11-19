import { Helmet } from 'react-helmet-async';
import { useParams } from "react-router-dom";

import NotFoundPage from '../pages/page-not-found';
import { Button, Stack } from '@mui/material';
import { useState } from 'react';
import BackupView from '../sections/backup/view/backup-view';

// ----------------------------------------------------------------------

export default function BackupPage() {

    return (
        <>
            <Helmet>
                <title> Ferreyra | Backup </title>
            </Helmet>

            <BackupView />
        </>
    );
}
