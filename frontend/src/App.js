import React, { useState, useEffect } from 'react';
import './App.css';
import TemperatureGraph from './components/TemperatureChart';
import Temperature from './components/Temperature';
import axios from 'axios';

const apiUrl = "http://localhost:3000/api/temperatures"

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([{}]);

  useEffect(() => {
    const fetchTemp = async () => {
      setIsLoading(true);
      const response = await axios.get(apiUrl);
      
      console.log('a ver', response.data);
      setData(response.data);
      setIsLoading(false);
    }
    fetchTemp();
  }, []);

  const getTemperaturesList = (topic) => {
    let listXYtemperature = data.filter(register => register.topic === topic).map( temp => {
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
      <div className="data-container">
        <div className="data-card">
          <Temperature />
        </div>
      </div>
      { isLoading 
        ?  <div>Loading ...</div>
        : (
          <div>
            <div className="chart">
              <TemperatureGraph list={getTemperaturesList('temperatura')} topic={'temperatura'} />
            </div>
            <div className="chart">
              <TemperatureGraph list={getTemperaturesList('humedad')} topic={'humedad'} />
            </div>
          </div>
          )
      } 
		</div>
  );
}

export default App