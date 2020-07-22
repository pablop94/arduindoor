import React, { useState, useEffect } from 'react';
import './App.css';
import { LinearProgress } from '@material-ui/core';
import TemperatureGraph from './components/TemperatureChart';
import Temperature from './components/Temperature';
import axios from 'axios';

function App() {
  const humimdity_topic = 'humedad';
  const temperature_topic = 'temperatura';

  const apiUrl = "http://localhost:3000/api/temperatures"

  const [isLoading, setIsLoading] = useState(false);
  //const [data, setData] = useState([{}]);
  const [temperatureData, setTemperatureData] = useState([{}]);
  const [humidityData, setHumidityData] = useState([{}]);
  
  useEffect(() => {
   
    const fetchTemp = async (topic) => {
      setIsLoading(true);
      const response = await axios.get(apiUrl, {
        params: {
          topic: topic
        }
      });
      topic === humimdity_topic ? setHumidityData(response.data) : setTemperatureData(response.data);
      setIsLoading(false);
    }
    fetchTemp(humimdity_topic);
    fetchTemp(temperature_topic);
  }, []);

  const getTemperaturesList = (topic) => {
    const list = topic === humimdity_topic ? humidityData : temperatureData;
    let listXYtemperature = list.filter(register => register.topic === topic).map( temp => {
      const date = new Date(temp.createdAt)
      return temp = { "x": date.getHours(), "y": temp.value}
    })

    const tempLine = {
      "id": topic,
      "color": "hsl(47, 70%, 50%)",
      "data": listXYtemperature
    }
    console.log('templine', tempLine)
    return [tempLine]
  }

  

  return (
        <div className="App">
          <div className="App-header">
            <h1>Arduindoor</h1>
          </div>
              <Temperature />
          { isLoading 
            ?  (<div className="App-loader">
                  <LinearProgress color='secondary' />
                  <h5>Cargando...</h5>
                </div>
            )
            : (
              <div>
                <div className="chart">
                  <TemperatureGraph list={getTemperaturesList(temperature_topic)} topic={temperature_topic} />
                </div>
                <div className="chart">
                  <TemperatureGraph list={getTemperaturesList(humimdity_topic)} topic={humimdity_topic} />
                </div>
              </div>
              )
          }
          <div className="App-footer">
            <h5>Arduindoor</h5>
            <a className="App-Link" href='https://github.com/pablop94/arduindoor'>
            <h6>Github</h6>
            </a>
          </div> 
        </div>
  );
}

export default App