import React from 'react';
import { useState, useEffect } from "react";
import { MixedChart } from "../components/charts/MixedChart";

export default function DataMixedChart () {

  const [isLoading, setIsLoading] = useState(true);
   

  /**Trae los datos desde la API Ejemplo: https://www.escuelafrontend.com/articulos/data-fetching-con-react*/
    const [chartData, setChartData] = useState({});
    useEffect(() => {
        async function fetchPrices () {
          const res = await fetch("https://api.coincap.io/v2/assets/?limit=5")
                      .then(response =>{
                        if (!response.ok) {
                          throw new Error(`HTTP error: ${response.status}`);
                        }
                        return response.json();
                      })
                      .then(
                        json => {
                          setChartData({
                            labels: json.data.map((crypto) => crypto.name),
                            datasets: [
                              {
                                type: 'bar',
                                label: "Bar Dataset",
                                data: json.data.map((crypto) => crypto.priceUsd),
                                backgroundColor: [
                                    "#ffbb11",
                                    "#ecf0f1",
                                    "#50AF95",
                                    "#f3ba2f",
                                    "#2a71d0"
                                ],
                                hoverOffset: 4
                              },
                              { 
                                type: 'line',
                                label: "Line Dataset",
                                data: json.data.map((crypto) => crypto.priceUsd),
                                fill: false,
                                borderColor: 'rgb(54, 162, 235)'
                              }
                            ]
                          });
                          setIsLoading(false);
                        }
                      ).catch(()=> console.log("Error"));
        };
        fetchPrices()
      }, []);



    if (isLoading) { // si está cargando, mostramos un texto que lo indique
        return (
          <>
            <h1>Cargando...</h1>
          </>
        );
    }


    return (
      <>
          <MixedChart chartData={chartData}/>
      </>
    );
  }
