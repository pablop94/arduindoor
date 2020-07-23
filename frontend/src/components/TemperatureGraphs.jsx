import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import TemperatureGraph from './TemperatureChart';
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function TemperatureGraphs() {
    const humimdity_topic = 'humedad';
    const temperature_topic = 'temperatura';
  
    const apiUrl = "http://localhost:3000/api/temperatures"
  
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [temperatureData, setTemperatureData] = useState([{}]);
    const [humidityData, setHumidityData] = useState([{}]);
    
    const fetchTemp = async (topic, date) => {
      setIsLoading(true);
      const response = await axios.get(apiUrl, {
        params: {
          topic: topic,
          date: date
        }
      });
      topic === humimdity_topic ? setHumidityData(response.data) : setTemperatureData(response.data);
      setIsLoading(false);
    }
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      fetchTemp(humimdity_topic, date);
      fetchTemp(temperature_topic, date);
    };
  
    useEffect(() => {
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
      console.log('templine', [tempLine])

      return [tempLine]
    }
  
    
  
    return (
          <div className="section-container">
            { isLoading 
              ?  (<div className="loader">
                    <LinearProgress color='secondary' />
                    <h5>Cargando...</h5>
                  </div>
              )
              : (
                <div>
                  <h2 className="section-title">Evolución durante el día</h2>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>      
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Ver registro del dia"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  <div className="chart">
                    <TemperatureGraph list={getTemperaturesList(temperature_topic)} topic={temperature_topic} />
                  </div>
                  <div className="chart">
                    <TemperatureGraph list={getTemperaturesList(humimdity_topic)} topic={humimdity_topic} />
                  </div>
                  </MuiPickersUtilsProvider>
                </div>
                )
            }
          </div>
    );
  }
  
  export default TemperatureGraphs