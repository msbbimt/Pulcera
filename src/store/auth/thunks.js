/*Aquí se ejecutan acciones que internamente tienen una tarea asincrona*/

import { signInWithGoogle, registerUserWithEmailPassword, loginWithEmailPassword, logoutFirebase } from '../../firebase/providers';
import { registerUserWithEmailPasswordMicroservice, loginWithEmailPasswordMicroservice } from '../../microservicios/security';
import { checkingCredentials, checkingRegister, logout, login } from "./";




export const checkingAuthentication = ( ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() ); // cambia el status de no-autenticated a checking al hacer clic en el boton de Login 
    }
}

// Logearse con Google
export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() ); // cambia el status de no-autenticated a checking al hacer clic en el boton de Google 
        const result = await signInWithGoogle();  // aquí trae los datos de autenticación  displayName, email, photoURL, uid, accessToken
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        dispatch ( login( result ) ); // si todo esta bien manda a la funcion de login los datos de autenticación
    }
}


//! Cheking credentials
export const startChekingCredentials = () => {
    return async (dispatch) => {
        dispatch( checkingRegister() );
    }
}


//! REGISTRO de usuarios al servidor del IMT
export const startCreatingUserWithEmailPasswordMicroservice = ({ email, password, displayName }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() ); // cambia el status de no-autenticated a checking al hacer clic en el boton de CREAR CUENTA 
        const result = await registerUserWithEmailPasswordMicroservice({ email, password, displayName }); // Se conecta con el proveedor de servicio de autenticación del IMT
        if ( !result.ok ) return dispatch( logout( result ) );
        console.log("startCreatingUserWithEmailPasswordMicroservice: ", result);
        dispatch( login( result ));
    }
}

//! LOGIN al servidor del IMT
export const startLoginWithEmailPasswordMicroservice = ({ email, password }) => {
    return async( dispatch )  => {
        dispatch( checkingCredentials() ); // cambia el status de no-autenticated a checking al hacer clic en el boton de LOGIN
        const result = await loginWithEmailPasswordMicroservice({ email, password });
        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch ( login( result ) );
    }
}


// Logearse con Firebase
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() ); // cambia el status de no-autenticated a checking al hacer clic en el boton de Google 
        const result = await registerUserWithEmailPassword({ email, password, displayName }); // Se conecta con el servicio de autenticación del IMT
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );
        dispatch( login( result ));
    }
}



export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch )  => {
        dispatch( checkingCredentials() ); // cambia el status de no-autenticated a checking al hacer clic en el boton de Google 
        const result = await loginWithEmailPassword({ email, password });
        console.log(result);
        if ( !result.ok ) return dispatch( logout( result ) );
        dispatch ( login( result ) );
    }
}



export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch( logout() );
    }
}