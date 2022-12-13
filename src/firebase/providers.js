
/**
 * PROVEEDORES DE AUTENTICACIÓN
 */

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();


/**FUNCIÓN PARA AUTENTICARSE CON GOOGLE */
export const signInWithGoogle = async() => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider); // googleProvider trae el pop pup de google
        
        /*Autenticarse con Google*/
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        //console.log({ credentials });
        
        /*Autenticarse con Firebase*/
        //const user = result.user;
        //console.log({ user });

        /**Obtener ciertos datos de autenticación por Firebase*/
        const { displayName, email, photoURL, uid, accessToken } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid, accessToken
        }
        

    } catch (error) {
        //console.log({ error });
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }

}



//FUNCIÓN PARA CREAR UNA CUENTA DE USUARIO CON UN USUARIO Y PASSSWORD EN EL SERVIDOR DEL IMT
export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try{
        //console.log({email, password, displayName})
        //TODO: La cuenta la registra en Firebase, al acceder a su respuesta podemos obtener el uid del usuario.
        const respFirebase = await createUserWithEmailAndPassword(FirebaseAuth, email, password );
        const { uid, photoURL } = respFirebase.user;
       
        //TODO: actualizar el Name en Firebase
        await updateProfile ( FirebaseAuth.currentUser, { displayName }); 


        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    }catch (error) {
        console.log(error); // Aqui se traen los errores de Firebase y dependiendo de su código se manda un mensaje
        return { ok: false, errorMessage: error.message }
    }


}


export const loginWithEmailPassword = async({ email, password }) => {
    
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        }
        
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}


/*Cierra cualquier método de autenticación usado por Firebase*/
export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}