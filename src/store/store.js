import { configureStore } from '@reduxjs/toolkit'
import { aplicacionSlice } from './aplicacion/aplicacionSlice';
import { authSlice } from './auth/authSlice';

export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      aplicacion: aplicacionSlice.reducer,
  },
});

