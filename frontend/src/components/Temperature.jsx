import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import WavesTwoToneIcon from '@material-ui/icons/WavesTwoTone';
import OpacityTwoToneIcon from '@material-ui/icons/OpacityTwoTone';
import {getHumidityAdvice, getTemperatureAdvice } from '../advices';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#e3e8e4',
    borderRightColor: '#5ad65a',
    borderRightWidth: '30px',
    minWidth: '25vw',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
});

const mqtt = require('mqtt');

export default function Temperature(props) {
  const classes = useStyles();

  const options = {
    protocol: 'websockets'
  };
  const client  = mqtt.connect('mqtt://0.0.0.0:9001', options);

  // Sets default React state 
  const [humidity, setHumidity] = useState(<Fragment><em>nothing heard</em></Fragment>);
  const [temperature, setTemperature] = useState(<Fragment><em>nothing heard</em></Fragment>);

  useEffect(() => {
    // temperatura is a the MQTT topic
    client.subscribe('temperatura');  

    // humedad is a the MQTT topic
    client.subscribe('humedad');  
    client.on('message', function (topic, message) {
      console.log('topic ', topic)
      console.log('valor ', message.toString())
       // Updates React state with message 
      topic === 'temperatura' ?  setTemperature(message.toString()) :  setHumidity(message.toString())
     
      // client.end();
    });       
  }, []);          
 

  return(
    <Box className={classes.dataContainer}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Temperatura
          </Typography>
          <WavesTwoToneIcon />
          <Typography className={classes.pos} color="textSecondary">
            {temperature + '°C'}
          </Typography>
          <Typography variant="body2" component="p">
            {getTemperatureAdvice(parseInt(temperature))}
            <br />
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Humedad
          </Typography>
          <OpacityTwoToneIcon />
          <Typography className={classes.pos} color="textSecondary">
            {humidity + '%'}
          </Typography>
          <Typography variant="body2" component="p">
            {getHumidityAdvice(parseInt(humidity))}
            <br />
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
  
  
}

