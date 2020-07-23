import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const mqtt = require('mqtt');

export default function LightMQTT() {

  //MQTT connection
  const options = {
    protocol: 'websockets'
  };
  const client  = mqtt.connect('mqtt://0.0.0.0:9001', options);

  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: '#7dc67c'  ,
      '&$checked': {
        transform: 'translateX(12px)',
        color: '#7dc67c',
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.common.white,
          borderColor: theme.palette.common.white,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: '#7dc67c',
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);
  
  const [state, setState] = useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    client.publish('luz', state.checkedC === true ? 'on': 'off')
  };

  return (
        <Grid component="label" container justify="center" alignItems="center" spacing={3}>
          <Grid item>Off</Grid>
          <Grid item>
            <AntSwitch checked={state.checkedC} onChange={handleChange} name="checkedC" />
          </Grid>
          <Grid item>On</Grid>
        </Grid>
  );
}