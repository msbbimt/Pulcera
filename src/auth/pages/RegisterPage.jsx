import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword, startChekingCredentials, startCreatingUserWithEmailPasswordMicroservice } from '../../store/auth';


const formData = {
    email: '' ,
    password: '',
    displayName: ''  
}

const formValidations = {
    email: [ (value) => value.includes('@'), '* obligatorio'],
    password: [ (value) => value.length >= 6, 'El password debe tener más de 6 caractéres.' ],
    displayName: [ (value) => value.length >= 1, '* obligatorio' ]
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [ formSubmitted, setFormSubmitted ] = useState(false);

  //! errorMessage
  //const  status=null, errorMessage=null ;
  const { status, errorMessage } = useSelector ( state => state.auth );
  
  console.log("RegisterPage: status", status);  
  console.log("RegisterPage: errorMessage", errorMessage);

  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );


  const { 
    formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm (formData, formValidations); 



  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;
        //dispatch (startCreatingUserWithEmailPassword(formState));
    dispatch (startCreatingUserWithEmailPasswordMicroservice(formState)); // Microservice: security 
  }

  const chekingCredentials = () => {
    dispatch(startChekingCredentials());
  }



  return (
    
    <AuthLayout title="Crear cuenta">
       
        <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
             
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField
                  label="Nombre completo"
                  type="text"
                  placeholder='Nombre completo'
                  fullWidth
                  name="displayName"
                  value={ displayName }
                  onChange={ onInputChange }
                  error={ !!displayNameValid && formSubmitted }
                  helperText={ displayNameValid }
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder='correo@google.com'
                  fullWidth
                  name="email"
                  value={ email }
                  onChange={ onInputChange }
                  error={ !!emailValid && formSubmitted }
                  helperText={ emailValid }
                />
              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder='Contraseña'
                  fullWidth
                  name="password"
                  value={ password }
                  onChange={ onInputChange }
                  error={ !!passwordValid && formSubmitted }
                  helperText={ passwordValid }
                />
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt:1}}>
                  
                  <Grid 
                    item
                    xs={ 12 }
                    display={ !!errorMessage ? '': 'none' }
                  >
                      <Alert severity='error'>
                          { errorMessage }
                      </Alert>
                  </Grid>
                  
                  <Grid item xs={ 12 }>
                      <Button 
                        disabled = { isCheckingAuthentication }
                        type="submit"
                        variant='contained'
                        fullWidth>
                          Crear cuenta
                      </Button>
                  </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>
                <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>
                <Button onClick = { chekingCredentials }>
                  <Link component={RouterLink} color='inherit' to='/auth/login'>
                      Ingresar
                  </Link>
                </Button>

              </Grid>

          </Grid>

        </form>
    </AuthLayout>
       

  )
}
