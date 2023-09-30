import { useEffect } from "react";
import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme"

export const App = () => {

    return (
        <>
            <AppTheme>
                <AppRouter />
            </AppTheme>
        </>
    )
}
