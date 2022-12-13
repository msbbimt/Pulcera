
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
 
 

//FUNCIÓN PARA CREAR UNA CUENTA DE USUARIO CON UN USUARIO Y PASSSWORD EN EL SERVIDOR DEL IMT
export const registerUserWithEmailPasswordMicroservice = async ({ email, password, displayName }) => {

    try{
        //console.log({email, password, displayName})
        //TODO: La cuenta la registra en Firebase, al acceder a su respuesta podemos obtener el uid del usuario.
        const respFirebase = await createUserWithEmailAndPassword (FirebaseAuth, email, password );
        const { uid} = respFirebase.user;
       
        //TODO: actualizar el Name en Firebase
        await updateProfile ( FirebaseAuth.currentUser, { displayName }); 

        //! Crear la cuenta en el servidor del IMT, mandar el email, password, displayName
        //const resp = await fetch (`http://189.254.204.50:8083/IoT/evento?operacion=ultimo&dispositivo=3F24FD`); 
        //const data = await resp.json();
        const data = 
        [
            {
                "id": 1779,
                "time": 1663094227,
                "nameUser": "API_Marisol",
                "deviceType": "61ba37f91bc6dba493d9bbd5",
                }
        ]
        

        const accessToken = data[0].id;
        const nameUser = data[0].nameUser;


        return {
            ok: true,
            uid, accessToken, email, displayName
        }

    }catch (error) {
        //console.log(error); 
        if (error.message==="Firebase: Error (auth/email-already-in-use).")
            {   
                console.log("Hay un error en el registro: ", error.message);
                return { ok: false, errorMessage: "El correo ya está en uso." }
            }
        //return { ok: false, errorMessage: error.message }
    }
}



// http://189.254.204.50:8083/IoT/evento?operacion=ultimo&dispositivo=3F24FD${usuario}&${password}


//LOGIN
// Logearse al servidor del IMT
export const loginWithEmailPasswordMicroservice = async({ email, password }) => {
    
    try {

        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, displayName } = resp.user;

        //! Crear la cuenta en el servidor del IMT: mandarle email, password
        //const resp = await fetch (`http://189.254.204.50:8083/IoT/evento?operacion=ultimo&dispositivo=3F24FD`); 
        //const data = await resp.json();
        const data = 
        [
            {
            "id": 1779,
            "time": 1663094227,
            "nameUser": "API_Marisol",
            "deviceType": "61ba37f91bc6dba493d9bbd5",
            }
        ]

        const accessToken = data[0].id;
        const nameUser = data[0].nameUser;
        return {
            ok: true,
            uid, accessToken, nameUser, displayName
        }
        
    } catch (error) {

        if (error.message==="Firebase: Error (auth/invalid-email)." || error.message==="Firebase: Error (auth/internal-error).") 
            {   
                console.log("hay un error: ", error.message);
                return { ok: false, errorMessage: "Correo y contraseña inválida" }
            }
        
        return { ok: false, errorMessage: error.message }
    }
}