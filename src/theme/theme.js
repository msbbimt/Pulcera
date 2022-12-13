import { createTheme, makeStyles } from '@mui/material/styles';

const arcBlueClaro = "#2196f3" //"#757de8"
const arcBlueFuerte = "#222A41" //"#b6bf00" 

export const theme = createTheme({
    palette: {
        common: {
            blueClaro: `${arcBlueClaro}`,
            blueFuerte: `${arcBlueFuerte}`
        }, 
        primary: {
            main: `${arcBlueClaro}`
        },
        secondary: {
            main: `${arcBlueFuerte}`
        },
        warning: {
            main: '#e53e3e'
        }
    },
    typography: {
        tab: {
            fontFamily: "Raleway",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            color: 'white'
        },
        estimate: {
            color:'red'
        },
        drawer: {
            color:'white'
        }
    }

});


//palette: { mode: 'dark' }

