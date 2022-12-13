import React from 'react';
import { Bar } from 'react-chartjs-2';
import  "../../styles/graphics.css";

export const BarChart = ({chartData}) => {

   return ( 
        <div className='char-bar'>
            <Bar
                data={chartData} 
                options={{
                    plugins:{
                        title:{
                            display: true,
                            text: "Bar Chart"
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



