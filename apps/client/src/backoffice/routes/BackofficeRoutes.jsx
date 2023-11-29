import { Navigate, Route, Routes } from "react-router-dom"
import { InicioPage, InmueblePage, ListaInmueblesPage } from "../pages"

export const BackofficeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <InicioPage /> } />
            <Route path="/inmueble/ver/:id" element={ <InmueblePage page="ver"/> } />
            <Route path="/inmueble/editar/:id" element={ <InmueblePage page="editar"/> } />
            <Route path="/inmuebles" element={ <ListaInmueblesPage /> } />
        </Routes>
    )
}
