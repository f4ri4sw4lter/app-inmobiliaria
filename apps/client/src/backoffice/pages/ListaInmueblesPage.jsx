import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"
import { BackofficeLayout } from "../layout/BackofficeLayout"
import { ListaInmueblesView } from "../views"

export const ListaInmueblesPage = () => {

    return (
        <BackofficeLayout>
            <ListaInmueblesView />
        </BackofficeLayout>
    )
}
