
import { useDispatch, useSelector } from "react-redux";
import { startNewPulsera } from "../../store/aplicacion/thunks";
import { Grid, Typography, Container } from '@mui/material';



export const HomePage = () => {
  /**Crear una constante hacia el dispatch */
  const dispatch = useDispatch();

  // Si tenemos algo en la pulcera (active es un objeto) es lo que se va a mostrar en pantalla
  const { isSaving, active } = useSelector ( state => state.aplicacion );

  /**Creamos una funcion que haga el dispatch de la acción*/
  const onClickNewNote = () => {
      dispatch( startNewPulsera() );//Se puede mandar llamar al id del usuario dentro de la acción, pero ya lo tenemos en el store y los thunks también tienen acceso al store
  }

  return (
    <Container 
      className='animate__animated animate__fadeIn animate__faster' 
      maxWidth="xlg" 
      sx={{ minHeight: 'calc(100vh - 110px)!important', 
      backgroundColor: 'common.blueFuerte', 
      borderRadius:3}}>
        
      <Grid container>
        <Grid item xs={12} sx={{ mt:10, ml:10, mr:10 }}>
          <Typography color="white" variant='h5'>
            Bienvenido
          </Typography>
          <br></br>
          <Typography variant="h6" color="white">
              En esta aplicación se puede consultar el comportamiento de la frecuencia cardiaca dentro de un periodo o temporalidad previamente definida. 
          </Typography>
          
        </Grid>

      </Grid>

    </Container>
    


     
   
  )
}
