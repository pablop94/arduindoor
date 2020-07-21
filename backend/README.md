# ArduIndoor

Un dashboard hecho en React.js, Node.js para controlar tus plantas utilizando Arduino.

### Comandos
Para iniciar la conexión vía puerto serie
```
npm run serial
```

### Configuración
Se pueden cambiar los siguientes valores de la configuración:

*  MQTT_CONNECTION: *default mqtt://localhost:1883*
*  SERIAL_PORT: *default /dev/ttyUSB0*
*  LOG_CONFIG: *default {
        "logFilePath": "logs/serial.log",
        "timestampFormat": "YYYY-MM-DD HH:mm:ss"
    }*
