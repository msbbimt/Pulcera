import React from 'react';
import { Pie } from 'react-chartjs-2';
import  "../../styles/graphics.css";

export const PieChart = ({chartData}) => {
    return ( 
        <div className='chart-pie'>
            <Pie
                data={chartData} 
                options={{
                    plugins:{
                        title:{
                            display: true,
                            text: "Pie Chart"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                }}
          />
        </div>
    );
}
