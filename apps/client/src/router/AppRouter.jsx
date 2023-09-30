import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { BackofficePage } from "../backoffice/pages/BackofficePage"
import { BackofficeRoutes } from "../backoffice/routes/BackofficeRoutes"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*"  element={ <AuthRoutes /> } />

            <Route path="/*" element={ <BackofficeRoutes /> } />
        </Routes>
    )
}
