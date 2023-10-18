import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme, ferreyraTheme } from "./"

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={ ferreyraTheme }>
            <CssBaseline />
            { children }
        </ThemeProvider>
    )
}
