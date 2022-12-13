import React from 'react';
import { Scatter } from 'react-chartjs-2';
import  "../../styles/graphics.css";
import { Container } from '@mui/material';

export const MixedChart = ({chartData}) => {

   return ( 
        <div className='chart-mixed'>
            <Scatter
                data={chartData} 
                options={{
                    plugins:{
                        title:{
                            display: true,
                            text: "Mixed Chart"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        y: {
                          beginAtZero: true
                        }
                      }
                }}
          />
        </div>
    );
}



