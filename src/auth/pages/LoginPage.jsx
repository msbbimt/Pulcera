import { useState, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Alert, Typography, TextField, Button, Link } from '@mui/material';
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';
import { startLoginWithEmailPassword, startLoginWithEmailPasswordMicroservice, startChekingCredentials, startGoogleSignIn } from '../../store/auth';

/*const formValidations = {
  email: [ (value) => value.includes('@'), '* obligatorio'],
  password: [ (value) => value.length === 0, '* obligatorio' ]
}

const formData = {
  email: '' ,
  password: ''
}*/

export const LoginPage = () => {

  const { status, errorMessage } = useSelector ( state => state.auth );

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  });


  // Aquí se verifica si el estatus es = a checking y el resultado boleano lo guarda en la dependencia [status]
  const isAuthenticating = useMemo( () => status === 'checking', [status] );


  //! Aqui se autentica con el email y password previamente validados en el useForm - tarea asincrona
  const onSubmit = (event) => {
    event.preventDefault();
    dispatch ( startLoginWithEmailPasswordMicroservice ({ email, password }) );
  }


  const chekingCredentials = () => {
    dispatch ( startChekingCredentials() );
  }


  //Aquí se autentica con Google, dispara la ventana emergente de google para elegir la cuenta - tarea asincrona
  const onGoogleSignIn = () => {
      dispatch ( startGoogleSignIn() );
  }

  return (
    
    <AuthLayout title="Login">
        <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder='correo@google.com'
                  fullWidth
                  name="email"
                  value= { email }
                  onChange={ onInputChange }
                />
               
              </Grid>

              <Grid item xs={ 12 } sx={{ mt:2 }}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder='Contraseña'
                  fullWidth
                  name="password"
                  value= { password }
                  onChange={ onInputChange }
                />
              </Grid>

         
              <Grid 
                container
                display={ !!errorMessage ? '': 'none' }
                sx={{ mt:1 }}>
              <Grid 
                item
                xs={ 12 }
                >
                      <Alert severity='error'>
                          { errorMessage }
                      </Alert>
                  </Grid>
              </Grid>

              <Grid container spacing={ 2 } sx={{ mb:2, mt:1}}>
                  <Grid item xs={ 12 } sm={ 6 }>
                      <Button 
                        disabled= { isAuthenticating }
                        type='submit'
                        variant='contained'
                        fullWidth>
                          Login
                      </Button>
                  </Grid>


                  <Grid item xs={ 12 } sm={6}>
                      <Button 
                        disabled= { isAuthenticating }
                        variant='contained'
                        fullWidth
                        onClick={ onGoogleSignIn }>
                          <Google />
                          <Typography sx={{ ml:1 }}>Google</Typography>
                      </Button>
                  </Grid>
              </Grid>

              <Grid container direction='row' justifyContent='end'>

              <Button onClick = { chekingCredentials }>
                <Link component={RouterLink} color='inherit' to='/auth/register'>
                    Crear una cuenta
                </Link>
              </Button>

              </Grid>

          </Grid>

        </form>
    </AuthLayout>
       

  )
}
