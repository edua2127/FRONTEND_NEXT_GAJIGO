import { createTheme } from '@mui/material/styles'

const lightThemeOptions = createTheme({
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    background: '#339989',
                },
            },
        },
    },
    palette: {
        mode: 'light',
        primary: {
            main: '#339989',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#d4cfcf',
            light: '#d9d9d9',
        },
    },
    typography: {
        body1: {
            fontSize: '0.9rem',
        },
        h6: {
            fontSize: '1.8rem',
        },
    },
})

export default lightThemeOptions
