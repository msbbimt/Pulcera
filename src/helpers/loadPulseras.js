import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadPulseras = async (uid = '') => {
    if ( !uid ) throw new Error ('El UID del usuario no existe');

    // Aqui agregar instrucción para conectarse a la API (backend) IMT




    // Aquí se traen los registros de las colecciones creadas en Firebase
    const collectionRef = collection(FirebaseDB, `${ uid }/aplicacion/pulcera` );
    const docs = await getDocs(collectionRef);

    const pulseras = [];
    docs.forEach( doc=> {
        pulseras.push({id: doc.id, ...doc.data() });
    });
    // Se obtienen los registros y se guardan en el arreglo pulseras.
    console.log(pulseras);
    return pulseras;


}