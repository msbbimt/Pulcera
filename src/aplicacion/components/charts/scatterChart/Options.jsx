import React from 'react';
import { Scatter } from 'react-chartjs-2';
import  "../../../styles/graphics.css";
import { Container } from '@mui/material';

export const Options = ({chartData}) => {
    return ( 
        <div className='chart-scatter'>
            <Scatter
                data={chartData} 
                options={{
                    plugins:{
                        title:{
                            display: true,
                            text: "Scatter Chart"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    },
                    scales: {
                        x: {
                            type: 'linear',
                            position: 'bottom'
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true
                    //maintainAspectRatio: true
                }}
                
          />
        </div>
    );
}
