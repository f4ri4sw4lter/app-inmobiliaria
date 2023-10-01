import { Navigate, Route, Routes } from "react-router-dom"
import { ListaInmueblesPage } from "../pages/ListaInmueblesPage"

export const BackofficeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <ListaInmueblesPage /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
    )
}
