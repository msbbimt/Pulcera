import { Box} from "@mui/system";
import { Header, SideBar} from "../components/ui";
import { Toolbar } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { Navigate, Route, Routes, BrowserRouter} from "react-router-dom";
//import { Switch } from '@mui/material';
import  "../styles/styles.css";


const drawerWidth= 240; // 280 Aquí se puede ajustar el ancho del menú lateral izquierdo

export const AppLayout = ({ children }) => {
  return (

    
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>
  
      <Header/>
        
           
       


      {/*<SideBar drawerWidth={ drawerWidth } />*/}

     
        <Box
            component='main'
            sx={{ flexGrow:1, p:3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
            <Toolbar />

           
            { children }   
            

        </Box>
      

    </Box>
  
  )
}
