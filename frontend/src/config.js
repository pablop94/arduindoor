export default {
  server: {
    API_URL: process.env.REACT_APP_API_URL,
  },
  mqtt: {
    IP: process.env.REACT_APP_MQTT_IP,
    HUMIDITY_TOPIC: process.env.REACT_APP_HUMIDITY_TOPIC,
    TEMPERATURE_TOPIC: process.env.REACT_APP_TEMPERATURE_TOPIC,
    LIGHT_TOPIC: process.env.REACT_APP_LIGHT_TOPIC,
  }
};
