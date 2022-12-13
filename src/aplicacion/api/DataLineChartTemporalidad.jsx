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


export default function DataLineChartTemporalidad(props) {

    const [isErrorPeriodo1, setErrorPeriodo1] = useState(true);
    const [isErrorPeriodo2, setErrorPeriodo2] = useState(true);
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
    console.log("Tipo de calculo", props.data.calculo);

    var URL;
    if (props.data.calculo == "temporalidad") {
        URL = "http://lab-internet-de-las-cosas.imt.mx/Smartband/graficas?id=C1%3A01%3A0C%3A04%3A2F%3A1D&fechainicial=" + props.data.fechaInicio + "&horainicial=" + props.data.horaInicio + "&horafinal=" + props.data.horaFin + "&muestra=" + props.data.muestra + "&variable=" + props.data.variable + "";
        //URL = "http://lab-internet-de-las-cosas.imt.mx/Smartband/graficas?id=C1%3A01%3A0C%3A04%3A2F%3A1D&fechainicial=20220823&horainicial=0000&horafinal=1200&muestra=60&variable=heartrate";
        console.log("TEMPORALIDADdsfsdfsfd");
    }

    const labelsEjeX = ['05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];//['0000', '0010', '0020', '0030', '0040', '0050', '0100']

    useEffect(() => {
        (async function () {

            const url1 = "http://lab-internet-de-las-cosas.imt.mx/Smartband/graficas?id=C1%3A01%3A0C%3A04%3A2F%3A1D&fechainicial=20220823&horainicial=0000&horafinal=1200&muestra=60&variable=heartrate";
            const url2 = "http://lab-internet-de-las-cosas.imt.mx/Smartband/graficas?id=C1%3A01%3A0C%3A04%3A2F%3A1D&fechainicial=20220824&horainicial=0000&horafinal=1200&muestra=60&variable=heartrate";

            const response1 = await fetch(url1);
            const json1 = await response1.json();

            const response2 = await fetch(url2)
            const json2 = await response2.json();

            console.log("response2", json2);

            if (json1.length == 0) {
                setErrorPeriodo1(true);
                setIsLoading(false);
            } else {

                //console.log("json.length: ", json[0].muestras);
                setErrorPeriodo1(false);
                setChartData(
                    {
                        labels: labelsEjeX,//json1[0].muestras.map((data) => ((new Date(data.timestamp * 1000).toISOString().split("T")[1]).split(".")[0])),  // Eje X
                        datasets:
                            [
                                {
                                    data: json1[0].muestras.map((data) => data.media),    // DATOS A GRAFICAR
                                    borderColor: 'red',
                                    backgroundColor: 'red',
                                    label: 'Muestra 1',
                                    pointBackgroundColor: function (context) {
                                        var index = context.dataIndex;
                                        var value = context.dataset.data[index];
                                        if (value >= json1[0].parametros.limite_superior) return 'red'
                                        if (value < json1[0].parametros.limite_superior && value > json1[0].parametros.limite_inferior) return 'red'
                                        if (value <= json1[0].parametros.limite_inferior) return 'red'
                                    }
                                },
                                {
                                    data: json2[0].muestras.map((data) => data.media),    // DATOS A GRAFICAR
                                    borderColor: 'green',
                                    backgroundColor: 'green',
                                    label: 'Muestra 2',
                                    pointBackgroundColor: function (context) {
                                        var index = context.dataIndex;
                                        var value = context.dataset.data[index];
                                        if (value >= json2[0].parametros.limite_superior) return 'green'
                                        if (value < json2[0].parametros.limite_superior && value > json2[0].parametros.limite_inferior) return 'green'
                                        if (value <= json2[0].parametros.limite_inferior) return 'green'
                                    }
                                }


                            ]
                    }
                );//setChartData



                setOptions(
                    [
                        {
                            type: 'line',
                            borderColor: 'red',
                            borderWidth: 2,
                            scaleID: 'y',
                            value: json1[0].parametros.limite_superior,
                            label: {
                                display: true,
                                content: 'UCL: ' + (json1[0].parametros.limite_superior).toFixed(3),
                                rotation: 'auto',
                                position: 'end'
                            }
                        },
                        {
                            type: 'line',
                            borderColor: 'red',
                            borderWidth: 2,
                            scaleID: 'y',
                            value: json1[0].parametros.limite_inferior,
                            label: {
                                display: true,
                                content: 'LCL: ' + (json1[0].parametros.limite_inferior).toFixed(3),
                                rotation: 'auto',
                                position: 'end'
                            }
                        },
                        {
                            type: 'line',
                            borderColor: 'red',
                            borderWidth: 2,
                            scaleID: 'y',
                            value: json1[0].parametros.linea_central,
                            label: {
                                display: true,
                                content: 'X: ' + (json1[0].parametros.linea_central).toFixed(3),
                                rotation: 'auto',
                                position: 'end'
                            }
                        },

                        {
                            type: 'line',
                            borderColor: 'green',
                            borderWidth: 2,
                            scaleID: 'y',
                            value: json2[0].parametros.limite_superior,
                            label: {
                                display: true,
                                content: 'UCL: ' + (json2[0].parametros.limite_superior).toFixed(3),
                                rotation: 'auto',
                                position: 'end'
                            }
                        },
                        {
                            type: 'line',
                            borderColor: 'green',
                            borderWidth: 2,
                            scaleID: 'y',
                            value: json2[0].parametros.limite_inferior,
                            label: {
                                display: true,
                                content: 'LCL: ' + (json2[0].parametros.limite_inferior).toFixed(3),
                                rotation: 'auto',
                                position: 'end'
                            }
                        },
                        {
                            type: 'line',
                            borderColor: 'green',
                            borderWidth: 2,
                            scaleID: 'y',
                            value: json2[0].parametros.linea_central,
                            label: {
                                display: true,
                                content: 'X: ' + (json2[0].parametros.linea_central).toFixed(3),
                                rotation: 'auto',
                                position: 'end'
                            }
                        }


                    ]
                );

                setIsLoading(false);


            }




        }
        )();

    }, [props]);



    if (isLoading) { // si está cargando, mostramos un texto que lo indique
        return (
            <>
                <h1>Cargando...</h1>
            </>
        );
    }

    if (isErrorPeriodo1) { // si está cargando, mostramos un texto que lo indique
        return (
            <>
                <Typography sx={{ fontSize: 14 }} color="warning.main" gutterBottom>
                    No hay registros en el periodo uno.
                </Typography>
            </>
        );
    }

    /*if (isErrorPeriodo2) { // si está cargando, mostramos un texto que lo indique
        return (
          <>
            <Typography sx={{ fontSize: 14 }} color="warning.main" gutterBottom>
              No hay registros en el periodo dos.
            </Typography>
          </>
        );
      }
    */


    return (
        <>
            <LineChart chartData={chartData} options={options} />
        </>
    );
}


/*options={chartOptions}*/