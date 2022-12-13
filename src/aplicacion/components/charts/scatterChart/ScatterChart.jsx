import React from 'react';
import { useState, useEffect } from "react";
import { Options } from "./Options";
import { Data } from "./Data";



export default function ScatterChart () {

 
  const [data, setData] = useState({
    //labels: Data.map((data)=> data.year),
    datasets: 
        [{
          label: "Scatter Dataset",
          data: [{
            x: -10,
            y: 0
          }, {
            x: 0,
            y: 10
          }, {
            x: 10,
            y: 5
          }, {
            x: 0.5,
            y: 5.5
          }],
          backgroundColor: 'rgb(255, 99, 132)'
        }]
     
    });

  
  
 
  return (
    <>
        <Options chartData={data}/>
    </>
  );


  
}



