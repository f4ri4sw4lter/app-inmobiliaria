import { Navigate, Route, Routes } from "react-router-dom"
import { BackofficePage } from "../pages/BackofficePage"

export const BackofficeRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <BackofficePage /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
    )
}
