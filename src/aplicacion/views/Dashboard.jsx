import React, { useContext, useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '@mui/material/styles';
Chart.register(...registerables);

import { Grid, Typography, Divider, Card, Switch, CardContent, MenuItem, OutlinedInput, TextField, FormControl, InputLabel, Select, Box, Container, CardHeader } from '@mui/material';
import Chip from '@mui/material/Chip';
//import BarChart from '../api/DataBarChart';
import DataLineChart from '../api/DataLineChart';
import DataPieChart from '../api/DataPieChart';
import DataMixedChart from '../api/DataMixedChart';
import DataBarChart from '../api/DataBarChart';
import ScatterChart from '../components/charts/scatterChart/ScatterChart';
//import { Filters } from '../components/Filters';
import "../styles/graphics.css";
import Paper from '@mui/material/Paper';
const drawerWidth = 240;
import { styled } from '@mui/material/styles';

const label = { inputProps: { 'aria-label': 'Switch demo' } };



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


/*const names = [
  'Elizabet de la Torre',
  'Cesar Montiel',
  'Bernardo Hernández',
  'Jared Piña',
  'Marisol Barrón',
];
*/

const namesUser = [
  { 'id': 'CC:49:8A:B2:51:11', 'nombre': 'Elizabet de la Torre' },
  { 'id': 'C8:54:49:44:FF:43', 'nombre': 'Cesar Montiel' },
  { 'id': 'C7:DD:7B:D1:C7:07', 'nombre': 'Bernardo Hernández' },
  { 'id': 'C1:01:0C:04:2F:1D', 'nombre': 'Jared Piña' },
  { 'id': 'EB:1F:18:46:AD:F2', 'nombre': 'Marisol Barrón' }
];


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export const Dashboard = () => {

  const theme = useTheme();


  /*
  const [personName, setPersonName] = React.useState([]);
  const handleChangeUser = (event) => {
    const { target: { value }, } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value,);
  };
  console.log("Usuario", personName);
*/

  //Control de usuarios
  const [user, setUser] = React.useState('C1:01:0C:04:2F:1D');
  const [openUser, setOpenUser] = React.useState(false);
  const handleChangeUser = (event) => {
    setUser(event.target.value);
  };
  const handleCloseUser = () => {
    setOpenUser(false);
  };
  const handleOpenUser = () => {
    setOpenUser(true);
  };

  //Tipo de variable a calcular
  const [variable, setVariable] = React.useState("heartrate");
  const handleChangeVariable = (event) => {
    setVariable(event.target.value);
  };






  //Switch
  const [checked, setChecked] = useState(false);
  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  //console.log("checkeddddddd", checked);
  //Ingreso de parámetros UCL, X y LCL
  const [valorUCL, setUCL] = useState(110);
  const handleChangeUCL = (event) => {
    setUCL(event.target.value);
  };
  const [valorX, setX] = useState(73);
  const handleChangeX = (event) => {
    setX(event.target.value);
  };
  const [valorLCL, setLCL] = useState(45);
  const handleChangeLCL = (event) => {
    setLCL(event.target.value);
  };






  const clearUser = (event) => {
    //setPersonName(value = "");
    //alert('clicked');
  }


  //Este objeto en su funcion textFieldDatetime se manda llamar desde el componente Fecha/Fin de la fecha actual a partir de las 12 de la mañana.
  const objectDate = {
    year: function () {
      return new Date().getUTCFullYear();
    },
    month: function () {
      return new Date().getMonth() + 1;
    },
    day: function () {
      if (new Date().getUTCDate() <= 9) {
        return ("0" + new Date().getUTCDate());
      } else { return new Date().getUTCDate(); }
    },
    initDate: function () {
      return '20220823'
    },
    date: function () {
      return `${this.year()}${this.month()}${this.day()}`;
    },
    hours: function () {
      if (new Date().getHours() <= 9) {
        return ("0" + new Date().getHours());
      } else { return new Date().getHours() }
    },
    minutes: function () {
      if (new Date().getMinutes() <= 9) {
        return ("0" + new Date().getMinutes());
      } else { return new Date().getMinutes(); }

    },
    hoursAndMinutes: function () { // Para hora fin
      return `${this.hours()}` + `${this.minutes()}`
    },
    initHour: function () {
      return '0000';
    },
    initSecond: function () {
      return '00';
    },
    textFieldDatetimeInicio: function () {
      return `2022-08-23T00:00`;
    },
    textFieldDatetimeFin: function () {
      return `${this.year()}-${this.month()}-${this.day()}T${this.hours()}:${this.minutes()}`
    }

  }

  //Toma solo como valor de inicio el valor del objeto, despues cuando se da clic en el dateTime se manda su valor al setData
  const [dateInicio, setDateInicio] = useState(objectDate.initDate());
  const [hourInicio, setHourInicio] = useState(objectDate.initHour());
  const [dateFin, setDateFin] = useState(objectDate.date());
  const [hourFin, setHourFin] = useState(objectDate.hoursAndMinutes());
  const [muestra, setMuestra] = useState(60);


  return (

    <Grid container className='animate__animated animate__fadeIn animate__faster' >

      <Grid item xs={12} sm={12} md={12} lg={12} className='' >
        <Card variant="outlined" sx={{ ml: 3, mr: 3, mt: 3, mb: 3, borderRadius: '10px', borderColor: 'primary.main' }}>
          <CardHeader subheader="Datos a partir del 23 de agosto del 2022"></CardHeader>
          <CardContent >
            <Grid container spacing={2} sx={{ backgroundColor: "", mb: 2 }}>
              <Grid item xs={12} sm={12} md={12} lg={4} sx={{ backgroundColor: "" }}>
                <TextField
                  id="datetime-local"
                  label="Fecha/Hora inicio"
                  type="datetime-local"
                  defaultValue={objectDate.textFieldDatetimeInicio()}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: 250 }}
                  shouldDisableDate={true}
                  onChange={(e) => {
                    setDateInicio(((e.target.value.split("T")[0]).split("-"))[0] + ((e.target.value.split("T")[0]).split("-"))[1] + ((e.target.value.split("T")[0]).split("-"))[2]); //Manda la fechaInicio al UseState
                    setHourInicio(((e.target.value.split("T"))[1]).split(":")[0] + ((e.target.value.split("T"))[1]).split(":")[1]); //Manda la horaInicio al UseState sin el split 2022-11-25T06:06
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} sx={{ backgroundColor: "" }}>
                <TextField
                  id="datetime-local"
                  label="Fecha/Hora fin"
                  type="datetime-local"
                  defaultValue={objectDate.textFieldDatetimeFin()}
                  sx={{ width: 250 }}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setDateFin(((e.target.value.split("T")[0]).split("-"))[0] + ((e.target.value.split("T")[0]).split("-"))[1] + ((e.target.value.split("T")[0]).split("-"))[2]) //Manda la fechaFin al UseState
                    setHourFin(((e.target.value.split("T"))[1]).split(":")[0] + ((e.target.value.split("T"))[1]).split(":")[1]) //Manda la horaFin al UseState
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} sx={{ backgroundColor: "" }}>
                <TextField
                  id="outlined-required"
                  label="Muestra en un periodo de tiempo"
                  defaultValue="60"
                  onChange={(e) => {
                    console.log("Muestra", e.target.value);
                    setMuestra(e.target.value)
                  }}
                />

              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4} sx={{ backgroundColor: "" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Variable</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={variable}
                    sx={{ width: 250 }}
                    label="Variable"
                    //defaultValue={variable}
                    onChange={handleChangeVariable}
                  >
                    <MenuItem value={"heartrate"}>Heartrate</MenuItem>
                    <MenuItem value={"steps"}>Steps</MenuItem>
                    <MenuItem value={"rawintensity"}>Rawintensity</MenuItem>
                    <MenuItem value={"rawkind"}>Rawkind</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={8} sx={{ backgroundColor: "" }}>
                <FormControl fullWidth={true}>
                  <InputLabel id="demo-controlled-open-select-label">Usuarios</InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openUser}
                    sx={{ width: 250 }}
                    onClose={handleCloseUser}
                    onOpen={handleOpenUser}
                    value={user}
                    defaultValue="C1:01:0C:04:2F:1D"
                    label="Usuarios"
                    onChange={handleChangeUser}
                  >
                    <MenuItem value={'CC:49:8A:B2:51:11'}>Elizabeth de la Torre</MenuItem>
                    <MenuItem value={'C8:54:49:44:FF:43'}>Cesar Montiel</MenuItem>
                    <MenuItem value={'C7:DD:7B:D1:C7:07'}>Bernardo Hernández</MenuItem>
                    <MenuItem value={'C1:01:0C:04:2F:1D'}>Jared Piña</MenuItem>
                    <MenuItem value={'EB:1F:18:46:AD:F2'}>Marisol Barrón</MenuItem>
                  </Select>
                </FormControl>
              </Grid>


            </Grid>

            <Divider variant="middle" />

            <Grid container spacing={2} sx={{ backgroundColor: "" }}>

              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ backgroundColor: "" }}>
                <Switch color="primary" checked={checked} onChange={switchHandler} />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} sx={{ backgroundColor: "" }}>
                <TextField
                  id="outlined-required"
                  label="UCL"
                  disabled={!checked}
                  value={valorUCL}
                  sx={{ width: 250 }}
                  defaultValue="110"
                  onChange={handleChangeUCL}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} sx={{ backgroundColor: "" }}>
                <TextField
                  id="outlined-required"
                  label="X"
                  disabled={!checked}
                  value={valorX}
                  sx={{ width: 250 }}
                  defaultValue="73"
                  onChange={handleChangeX}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={4} sx={{ backgroundColor: "" }}>
                <TextField
                  id="outlined-required"
                  label="LCL"
                  disabled={!checked}
                  value={valorLCL}
                  sx={{ width: 250 }}
                  defaultValue="45"
                  onChange={handleChangeLCL}
                />
              </Grid>

            </Grid>

          </CardContent>
        </Card>

      </Grid>


      <Grid item xs={12} sm={12} md={12} lg={12} className=''>
        <Card variant="outlined" sx={{ ml: 3, mr: 3, mt: 3, mb: 3, borderRadius: '10px', borderColor: 'primary.main' }}>
          <CardContent>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card sx={{ ml: 3, mr: 3, mt: 3, mb: 3 }} variant="outlined" className=''>
                <CardContent>
                  <DataLineChart
                    data={{
                      'calculo': "periodo",
                      'fechaInicio': dateInicio,
                      'horaInicio': hourInicio,
                      'fechaFin': dateFin,
                      'horaFin': hourFin,
                      'muestra': muestra,
                      'personas': user,
                      'variable': variable,
                      'switch': checked,
                      'valorUCL': valorUCL,
                      'valorX': valorX,
                      'valorLCL': valorLCL
                    }} />
                </CardContent>
              </Card>
            </Grid>
          </CardContent>
        </Card>
      </Grid>




    </Grid>












  )
}

