const mqtt = require('mqtt');
const { MQTT_CONNECTION } = require('./configuration')
const temperatures = require("./controllers/temperature.controller.js");

class MqttHandler {
  constructor() {
    // this.username = 'YOUR_USER'; // mqtt credentials if these are needed to connect
    // this.password = 'YOUR_PASSWORD';
  }
  
  connect() {
    // Connect mqtt with credentials (in case of needed, otherwise we can omit 2nd param)
    //this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password });

    this.mqttClient = mqtt.connect(MQTT_CONNECTION);

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

    // mqtt subscriptions
    this.mqttClient.subscribe('temperatura', {qos: 0});
    
    this.mqttClient.subscribe('humedad', {qos: 0});

    // When a message arrives, console.log it
    this.mqttClient.on('message', function (topic, message) {
      console.log(message.toString());
      const temperature = { 
        "topic": topic,
        "dataTime": new Date,
        "value": message
      }
      temperatures.logTemperature(temperature)
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }

  // Sends a mqtt message to topic: mytopic
  sendMessage(message) {
    this.mqttClient.publish('temperatura', message);
  }
}

module.exports = MqttHandler;