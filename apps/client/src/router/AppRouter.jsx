import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { ListaInmueblesPage } from "../backoffice/pages/ListaInmueblesPage"
import { BackofficeRoutes } from "../backoffice/routes/BackofficeRoutes"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*"  element={ <AuthRoutes /> } />

            <Route path="/*" element={ <BackofficeRoutes /> } />
        </Routes>
    )
}
