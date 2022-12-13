import { createSlice } from '@reduxjs/toolkit';


/**Reducers */

export const aplicacionSlice = createSlice({
    name: 'aplicacion',
    initialState: {
      isSaving: false, // False indica que está habilitado el boton para poder agregar
      messageSaved: '',
      pulseras: [],
      active: null
    },
    reducers: { 
        /**Aquí en los reducers sucede todo el trabajo asíncrono, funciones puras  */
        // Cuando yo toque este boton tengo que hacer el dispatch de una acción asincrona, para ello que pensar en los Thunks para despachar acciones asincronas
       
        // 1. Para evitar que el usuario de clics seguidos en el boton de add pulcera, cambiar el estado del isSaving
        // Si isSaving está en true, indica que está en proceso de guardar nota, entonces, el boton del HomePage se desabilitapor unos segundos en lo que guarda
        savingNewPulsera: (state) => {
            state.isSaving = true;
        },

        // 2. Carga la pulsera en el store
        addNewEmptyPulsera: (state, action) => { 
            state.pulseras.push( action.payload );//Carga la nueva pulsera que se creó
            state.isSaving = false; // Hace visible nuevamente el boton para poder guardar
        },
    
        // 3. Carga los datos de una pulsera, es decir, la que está activa por el usuario  (en el HomePage.jsx) para editarla o actualizarla
        setActivePulsera: (state, action) => {
            state.active = action.payload; // el payload tiene los registros de una pulsera y lo carga en el array active. Si el active tiene datos, se muestran ciertas pantallas en el HomePage. 
        },

     
        // 4. Se cargan todos los registros de todas las pulseras (consultados desde Firebase) en el store de Redux, es decir en pulseras []
        setPulseras: (state, action) => {
            state.pulseras = action.payload;
        },

        setSaving: (state) => {

        },

        updatePulsera: (state, action) => {

        },

        deletePulseraById: (state, action) => {

        }

    }
});


// Aquí se crean las acciones respectivas de los reducers 
export const { 
                addNewEmptyPulsera, 
                setActivePulsera,
                savingNewPulsera,
                setPulseras,
                setSaving,
                updatePulsera,
                deletePulseraById,
            
            } = aplicacionSlice.actions;