
import React, { useRef } from 'react';
import { useState, useEffect } from "react";
import { LineChart } from "../components/charts/LineChart";
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
//import "../../styles/graphics.css";
// https://es.acervolima.com/como-pasar-datos-de-un-componente-a-otro-componente-en-reactjs/
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);


export default function DataLineChart(props) {

  const [isError, setError] = useState(true);
  const [isLoading, setIsLoading] = useState(true);



  const annotationSuperior = {
    type: 'line',
    borderColor: 'orange',
    borderWidth: 2,
    scaleID: 'y',
    value: 135.05,
    label: {
      display: true,
      content: 'UCL: ' + 135.05,
      rotation: 'auto',
      position: 'end'
    },
  };
  const annotationInferior = {
    type: 'line',
    borderColor: 'orange',
    borderWidth: 2,
    scaleID: 'y',
    value: 121.22,
    label: {
      display: true,
      content: 'UCL: ' + 121.22,
      rotation: 'auto',
      position: 'end'
    },
  };
  const promedio = {
    type: 'line',
    borderColor: 'green',
    borderWidth: 2,
    scaleID: 'y',
    value: 128.14,
    label: {
      display: true,
      content: 'X: ' + 128.14,
      rotation: 'auto',
      position: 'end'
    }
  };





  const [chartData, setChartData] = useState({});
  const [options, setOptions] = useState({});

  //Jared: C1:01:0C:04:2F:1D
  //http://lab-internet-de-las-cosas.imt.mx/Smartband/graficas?id=C1%3A01%3A0C%3A04%3A2F%3A1D&fechainicial=20220823
  //&fechafinal=20220923
  //&horainicial=0000
  //&horafinal=1200
  //&muestra=60
  //&variable=heartrate

  //props.data.personName

  console.log("Line chart PERSONA", props.data.personas);
  console.log("Fecha-Inicio", props.data.fechaInicio);
  console.log("Hora-Inicio", props.data.horaInicio);
  console.log("Fecha-Fin", props.data.fechaFin);
  console.log("Hora-Fin", props.data.horaFin);
  console.log("muestra", props.data.muestra);
  console.log("variable", props.data.variable);

  console.log("checkeeeeed", props.data.switch == true ? props.data.valorUCL : "nooooooooooooo");



  /*
  var data = 1661270760;
  var horas = (((new Date(data*1000)).getHours()) <= 9 ? "0" + (new Date(data*1000)).getHours():(new Date(data*1000)).getHours())+":"+ ( ((new Date(data*1000)).getMinutes()) <= 9 ? "0" + (new Date(data*1000)).getMinutes():(new Date(data*1000)).getMinutes() );
  var minutos = ((new Date(data*1000)).getMinutes()) <= 9 ? "0" + (new Date(data*1000)).getMinutes():(new Date(data*1000)).getMinutes();
  console.log("Date Horas: ", horas);
  console.log("Date Minutos: ", minutos);
  */




  const objectDate = {
    hoursAndMinutes: function () {
      if (new Date().getHours() <= 9) {
        return ("0" + new Date().getHours());
      } else { return new Date().getHours() }
    },
    minutes: function () {
      if (new Date().getMinutes() <= 9) {
        return ("0" + new Date().getMinutes());
      } else { return new Date().getMinutes(); }

    }

  }


  useEffect(() => {
    (async function () {
      var URL;
      if (props.data.calculo == "periodo") {
        URL = "localhost:8080/Smartband/graficas?id=" + props.data.personas + "&fechainicial=" + props.data.fechaInicio + "&fechafinal=" + props.data.fechaFin + "&horainicial=" + props.data.horaInicio + "&horafinal=" + props.data.horaFin + "&muestra=" + props.data.muestra + "&variable=" + props.data.variable + " ";
        console.log("por periodo");
      }
      if (props.data.calculo == "temporalidad") {
        URL = "localhost:8080/Smartband/graficas?id=" + props.data.personas + "&fechainicial=" + props.data.fechaInicio + "&horainicial=" + props.data.horaInicio + "&horafinal=" + props.data.horaFin + "&muestra=" + props.data.muestra + "&variable=" + props.data.variable + "";
        console.log("por temporalidad");
      }

      await fetch(URL)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json();
        })
        .then(json => {
          if (json.length == 0) {
            setError(true);
            setIsLoading(false);
          } else {
            console.log("json.length: ", json[0].muestras);
            //console.log()
            setError(false);
            setChartData(
              {
                labels: json[0].muestras.map((data) => (

                  (((new Date(data.timestamp * 1000)).getHours()) <= 9 ? "0" + (new Date(data.timestamp * 1000)).getHours() : (new Date(data.timestamp * 1000)).getHours()) + ":" + (((new Date(data.timestamp * 1000)).getMinutes()) <= 9 ? "0" + (new Date(data.timestamp * 1000)).getMinutes() : (new Date(data.timestamp * 1000)).getMinutes())

                )),  // Eje X
                datasets:
                  [
                    {
                      data: json[0].muestras.map((data) => data.media),    // DATOS A GRAFICAR
                      //borderColor: 'rgb(255, 99, 132)',
                      //backgroundColor: "red",
                      label: 'Muestra',
                      pointBackgroundColor: function (context) {
                        var index = context.dataIndex;
                        var value = context.dataset.data[index];
                        if (value >= json[0].parametros.limite_superior) return 'red'
                        if (value < json[0].parametros.limite_superior && value > json[0].parametros.limite_inferior) return 'blue'
                        if (value <= json[0].parametros.limite_inferior) return 'red'
                      }
                    }
                  ]
              }
            );

            if (props.data.switch === true) {
              setOptions(
                [
                  {
                    type: 'line',
                    borderColor: 'orange',
                    borderWidth: 2,
                    scaleID: 'y',
                    value: props.data.valorUCL, 
                    label: {
                      display: true,
                      content: 'UCL: ' + props.data.valorUCL, 
                      rotation: 'auto',
                      position: 'end'
                    }
                  },
                  {
                    type: 'line',
                    borderColor: 'orange',
                    borderWidth: 2,
                    scaleID: 'y',
                    value: props.data.valorLCL,
                    label: {
                      display: true,
                      content: 'LCL: ' +  props.data.valorLCL,
                      rotation: 'auto',
                      position: 'end'
                    }
                  },
                  {
                    type: 'line',
                    borderColor: 'green',
                    borderWidth: 2,
                    scaleID: 'y',
                    value: props.data.valorX,
                    label: {
                      display: true,
                      content: 'X: ' + props.data.valorX,
                      rotation: 'auto',
                      position: 'end'
                    }
                  }
                ]
              );
            } else {
              setOptions(
                [
                  {
                    type: 'line',
                    borderColor: 'orange',
                    borderWidth: 2,
                    scaleID: 'y',
                    value: (json[0].parametros.limite_superior), //(json[0].parametros.limite_superior),
                    label: {
                      display: true,
                      content: 'UCL: ' + (json[0].parametros.limite_superior).toFixed(3), //(json[0].parametros.limite_superior).toFixed(3),
                      rotation: 'auto',
                      position: 'end'
                    }
                  },
                  {
                    type: 'line',
                    borderColor: 'orange',
                    borderWidth: 2,
                    scaleID: 'y',
                    value: json[0].parametros.limite_inferior,
                    label: {
                      display: true,
                      content: 'LCL: ' + (json[0].parametros.limite_inferior).toFixed(3),
                      rotation: 'auto',
                      position: 'end'
                    }
                  },
                  {
                    type: 'line',
                    borderColor: 'green',
                    borderWidth: 2,
                    scaleID: 'y',
                    value: json[0].parametros.linea_central,
                    label: {
                      display: true,
                      content: 'X: ' + (json[0].parametros.linea_central).toFixed(3),
                      rotation: 'auto',
                      position: 'end'
                    }
                  }
                ]
              );
            }


            setIsLoading(false);
          }
        }

        ).catch((error) => {
          setError(true);
          console.log("Error: ", error)
        });
    })();
    //fetchPresion()
  }, [props]);



  if (isLoading) { // si está cargando, mostramos un texto que lo indique
    return (
      <>
        <h1>Cargando...</h1>
      </>
    );
  }

  if (isError) { // si está cargando, mostramos un texto que lo indique
    return (
      <>
        <Typography sx={{ fontSize: 14 }} color="warning.main" gutterBottom>
          No hay registros en el periodo indicado para ese usuario.
        </Typography>
      </>
    );
  }



  return (
    <>
      <LineChart chartData={chartData} options={options} />
    </>
  );
}


/*options={chartOptions}*/