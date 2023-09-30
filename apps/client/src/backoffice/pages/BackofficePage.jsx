import { IconButton, Typography } from "@mui/material"
import { BackofficeLayout } from "../layout/BackofficeLayout"
import { InicioView, ListaInmueblesView } from "../views/"
import { AddOutlined } from "@mui/icons-material"

export const BackofficePage = () => {

    return (
        <>
            <BackofficeLayout>
                {/* NothingSelected */}
                <ListaInmueblesView />

                {/* NoteView 
                <NoteView/>*/}

                <IconButton 
                    size='large'
                    sx={{ 
                        color: 'white',
                        backgroundColor: 'error.main',
                        ':hover': {backgroundColor: 'error.main', opacity: 0.9},
                        position: 'fixed',
                        right: 50,
                        bottom: 50
                    }}
                >
                    <AddOutlined sx={{ fontSize: 30 }}/>
                </IconButton>
            </BackofficeLayout>
        </>
    )
}
