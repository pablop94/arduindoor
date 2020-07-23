import React, { useState, useEffect } from 'react';
import './App.css';
import TemperatureGraphs from './components/TemperatureGraphs';
import TemperatureMQTT from './components/TemperatureMQTT';

function App() {

  return (
        <div className="App">
          <div className="App-header">
            <h1>Arduindoor</h1>
          </div>
              <TemperatureMQTT />
              <TemperatureGraphs />
          <div className="App-footer">
            <h6>Arduindoor</h6>
          </div>
        </div>
  );
}

export default App