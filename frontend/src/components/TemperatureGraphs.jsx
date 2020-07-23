import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@material-ui/core';
import TemperatureGraph from './TemperatureChart';
import axios from 'axios';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import config from "../config";

function TemperatureGraphs() {

    const apiUrl = `${config.server.API_URL}/temperatures`
  
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
      topic === config.mqtt.HUMIDITY_TOPIC ? setHumidityData(response.data) : setTemperatureData(response.data);
      setIsLoading(false);
    }
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      console.log('qq', config.mqtt.HUMIDITY_TOPIC)
      fetchTemp(config.mqtt.HUMIDITY_TOPIC, date);
      fetchTemp(config.mqtt.TEMPERATURE_TOPIC, date);
    };
  
    useEffect(() => {
      fetchTemp(config.mqtt.HUMIDITY_TOPIC);
      fetchTemp(config.mqtt.TEMPERATURE_TOPIC);
    }, []);
  
    const getTemperaturesList = (topic) => {
      const list = topic === config.mqtt.HUMIDITY_TOPIC ? humidityData : temperatureData;
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
                    <TemperatureGraph list={getTemperaturesList(config.mqtt.TEMPERATURE_TOPIC)} topic={config.mqtt.TEMPERATURE_TOPIC} />
                  </div>
                  <div className="chart">
                    <TemperatureGraph list={getTemperaturesList(config.mqtt.HUMIDITY_TOPIC)} topic={config.mqtt.HUMIDITY_TOPIC} />
                  </div>
                  </MuiPickersUtilsProvider>
                </div>
                )
            }
          </div>
    );
  }
  
  export default TemperatureGraphs