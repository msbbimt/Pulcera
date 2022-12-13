import React, { useEffect, useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Box } from '@mui/material';
//import Chart from 'chart.js/auto';
import "../../styles/graphics.css";

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

export const LineChart = ( {chartData, options}) => {


/*const prevProps = useRef(chartData);
useEffect(() => {
    console.log("charData", prevProps);
},[chartData]);
*/


 
    return (
        <Box className='chart-line' sx={{ flexWrap: 'wrap' }}>
            <Line
                data={chartData}

                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: {display: false},
                    plugins: {
                        autocolors: false,
                        title: {
                            display: true,
                            text: "Gráfica de control X. Monitoreo de la frecuencia cardiaca (latidos por minutos).",
                            padding: {
                                top: 10,
                                bottom: 30
                            },
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                font: {
                                    size:12
                                }
                            }
                        },
                       
                        annotation: {
                            annotations: options
                        }
                    },
                    scales: {
                        y: {
                          display: true,
                          title: {
                            display: true,
                            text: 'Rango muestral'
                          }
                        }
                      }
                
                }}
            />

        </Box>
    );
}


