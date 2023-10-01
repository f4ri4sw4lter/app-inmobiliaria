import { IconButton, Typography } from "@mui/material"
import { BackofficeLayout } from "../layout/BackofficeLayout"
import { ListaInmueblesView } from "../views"
import { AddOutlined } from "@mui/icons-material"

export const ListaInmueblesPage = () => {

    return (
        <BackofficeLayout>
            <ListaInmueblesView />

            
        </BackofficeLayout>
    )
}
