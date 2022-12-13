
//import { ThemeProvider } from "@emotion/react";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import React, { createContext, useState } from 'react';
export const UiContext = createContext();

import { theme } from './theme';

/*Este es el componente padre (hight component). Dentro de este tendrá componentes hijos*/
// El children es el App.js, esta es la idea de un high it order compoonent.
export const AppTheme = ({ children }) => {

  return (
    <ThemeProvider theme={ theme }>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
