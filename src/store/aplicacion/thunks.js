import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewEmptyPulsera, savingNewPulsera, setActivePulsera, setPulseras } from './aplicacionSlice';

import { loadPulseras } from '../../helpers';




/**Thunks: Acciones dentro de funciones que se van a despachar */

/**Función startNewPulsera que despacha las acciones al hacer click en el boton ubicado en el HomPage (add pulcera):
 * savingNewPulsera
 * addNewEmptyPulsera
 * setActivePulsera
 * 
 * Nota: con la funcion getState se obtiene el id del usuario
 * */
export const startNewPulsera = () => {

    return async (dispatch, getState) => {

        // 1. Aqui impide al usuario que haga doble clic tan rapido, porque cada vez que hace clic inserta entradas en Firebase
        dispatch ( savingNewPulsera () );
        
        //console.log(getState());//Imprime los datos del usuario

        //2. Necesitamos el id del usuario para poder insertar
        const { uid } = getState().auth;
        console.log("Esto es el uid", uid);
       
        //3. Se crea el objeto de la pulcera que se va a insertar en la BD
        const newPulsera = {
            modelo: 'Amazfit 5',
            usuario: 'Marisol Barrón',
        }

        //4. Se accede a la referencia de la colección de Firebase por el id del usuario autenticado y Firebase crea un id para el nuevo registro (paso 5)
        const newDoc = doc( collection( FirebaseDB, `${ uid }/aplicacion/pulcera` ) );

        //5. Graba el objeto del paso 3 dentro del id generado automaticamente con el paso 4 
        const setDocResp = await setDoc ( newDoc, newPulsera );
        
        //console.log({ newDoc, setDocResp });
        
        // 6. Si todo sale bien en los puntos 4 y 5 se realizan los siguientes dispatchs

        // 7. Grabar la pulsera en el espacio del store que se definió: aplicacionSlice.js en pulseras: [] y como ya esta la nueva pulcera deberíamos activarla en el active

        // 8. Para el punto 7 se crearon dos dispatch (aunque podría hacerce en uno solo).

        //9. Creamos la propiedad de id a la pulsera
        newPulsera.id = newDoc.id;

        //10. Este dispatch inserta una nueva pulsera en Firebase
        dispatch ( addNewEmptyPulsera ( newPulsera ) ); // accion que requiere el payload: newPulsera

        //11. Este dispatch ACTIVA la pulcera para poder editarla y actualizarla
        dispatch ( setActivePulsera ( newPulsera ) );

    }
}

/**
 * Si recargamos la pantalla se pierden todas las notas previamente cargadas en el store, pero siguen existiendo en Firebase
 * Verificar que cuando el usuario entre se carguen sus registros, para ello llamar en el hook esta funcion: startLoadingPulseras 
 * Para traer los registros hacerlo por separado en la carpeta helpers y con ello mantenerlo facil de leer
*/
export const startLoadingPulseras = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth; // Aquí se trae el uid del usuario autenticado
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const pulseras = await loadPulseras ( uid ); // Aquí se traen los registros de las pulceras con el id del usuario desde Firebase (ir al helpers/loadPulseras)
        dispatch ( setPulseras (pulseras) );

    }
}


