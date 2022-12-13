import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AppRoutes } from '../aplicacion/routes/AppRoutes';
import { CheckingAuth } from '../ui/';
import { useEffect } from 'react';
import { useCheckAuth } from '../hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { logout } from '../store/auth/index';
/*https://www.copycat.dev/blog/react-js-navigation/ */

export const AppRouter = () => {
  
  const status = useCheckAuth();
 
 


  if ( status === 'checking' ) {
    console.log("status === 'checking'");
    return <CheckingAuth />
  }

  if ( status === 'authenticated' ) {
    onAuthStateChanged ( FirebaseAuth, async( user ) => {
      // if ( !user ) return dispatch ( logout() );
        const { uid, email, displayName, photoURL } = user;
        console.log("status === 'authenticated'",uid,displayName);
    })
  }


  //console.log("displayName", displayName);
  //<Route path="user/:userId"  element={ window.location.href = "http://www.w3schools.com" } />

  return (
    <>
    
      <Routes>

          {
            (status === 'authenticated')
            
            ? <Route path="/*"  element={ <AppRoutes /> } />  /* AppRoutes (aplicacion) lleva a la entrada a la Aplicación después de autenticarse */
            : <Route path="/auth/*" element={ <AuthRoutes/> }/> /* AuthRoutes (auth) lleva a Login o Registro */ 
          }

          <Route path='/*' element={ <Navigate to='/auth/login' /> } />

          { /* Login y Registro */ }
          { /* <Route path="/*" element={ <AppRoutes /> } /> */}


          { /* Entrada a la Aplicación después de autenticarse */ }
          { /* <Route path="/auth/*" element={ <AuthRoutes/> }/> */ }
          

      </Routes>
    </>
  )
}
