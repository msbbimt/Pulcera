import { Navigate, Route, Routes, BrowserRouter} from "react-router-dom";
import { Switch } from '@mui/material';
import { Dashboard, Temporalidad } from '../views';
import { HomePage } from "../pages/HomePage";
import { AppLayout } from "../layout/AppLayout";
import { Header, SideBar} from "../components/ui";

const drawerWidth= 240; 
export const AppRoutes = () => {

  //A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Switch se sustituye por Routes

  return (
  
    <AppLayout>
        
        <Routes>

          <Route path="/" element={ <HomePage /> } />
          <Route path="/*" element={ <Navigate to="/" /> } />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Temporalidad" element={<Temporalidad />} />
        </Routes>  
    



    </AppLayout>
  
  )
}
