import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import WavesTwoToneIcon from '@material-ui/icons/WavesTwoTone';
import OpacityTwoToneIcon from '@material-ui/icons/OpacityTwoTone';
import {getHumidityAdvice, getTemperatureAdvice } from '../advices';

const useStyles = makeStyles({
  root: {
    // backgroundColor: '#e3e8e4',
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
    color: '#7dc67c',
    fontWeight: '500',
    fontSize: '25px'
  },
  pos: {
    marginBottom: 12,
    color: '#7dc67c',
    fontWeight: '500',
    fontSize: '30px'
  },
  advice: {
    fontWeight: '100',
    fontSize: '18px'
  },
  dataContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  media: {
    width:'10vw'
  }
});

const mqtt = require('mqtt');

export default function TemperatureMQTT(props) {
  const classes = useStyles();

  //MQTT connection
  const options = {
    protocol: 'websockets'
  };
  const client  = mqtt.connect('mqtt://0.0.0.0:9001', options);

  // Sets default React state 
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();

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
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="space-around"
    >
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Temperatura
          </Typography>
          <WavesTwoToneIcon />
          { temperature ? (
            <div>
              <Typography className={classes.pos} color="textSecondary">
                {temperature ? temperature + '°C' : 'sin registro'}
              </Typography>
              <Typography variant="body2" component="p">
                {getTemperatureAdvice(parseInt(temperature))}
                <br />
              </Typography>
            </div>
            )
            :  <h5 className={classes.advice}>No hay registro</h5>
          }
        </CardContent>
      </Card>
      <CardMedia
        component="img"
        className={classes.media}
        image={require("./componentsAssets/flor.png")}
        title="Flor"
      />
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Humedad
          </Typography>
          <OpacityTwoToneIcon />
          { humidity ? (
            <div>
              <Typography className={classes.pos} color="textSecondary">
                {humidity + '%'}
              </Typography>
              <Typography variant="body2" component="p">
                {getHumidityAdvice(parseInt(humidity))}
                <br />
              </Typography>
            </div>
          )
            : <h5 className={classes.advice}>No hay registro</h5>
          }
        </CardContent>
      </Card>
    </Grid>
  )
}

