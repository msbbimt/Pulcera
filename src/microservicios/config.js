import { createAsyncThunk } from "@reduxjs/toolkit";
  
  
//TODO: Crear la cuenta en el servidor del IMT
export const fetchPostSecurityMicroservice = createAsyncThunk ( 'posts/fetchPosts', async ({ email, password }) => {

    try{
        /*const resp = await fetch (`http://189.254.204.50:8083/IoT/evento?operacion=ultimo&dispositivo=3F24FD`); 
        const data = await resp.json();
        const accessToken = data[0].id;
        return {
            ok: true,
            uid, accessToken, email, displayName
        }*/

    }catch (error) {
        console.log(error); 
        return { ok: false, errorMessage: error.message }
    }
})








