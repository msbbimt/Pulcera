import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { startLoadingPulseras } from '../store/aplicacion/thunks';
import { login, logout } from '../store/auth';

export const useCheckAuth = () => {
 
    const { status, displayName } = useSelector ( state => state.auth );
    const dispatch = useDispatch();

    // En este punto nos damos cuenta por primera vez que tenemos un usuario
  
    useEffect(() => {
  
      onAuthStateChanged ( FirebaseAuth, async( user ) => {
          if ( !user ) return dispatch ( logout() );
          const { uid, email, displayName, photoURL } = user;
          dispatch ( login({ uid, email, displayName, photoURL }) );
          dispatch ( startLoadingPulseras ());
          
      })
  
    }, []);

    return status;

}
