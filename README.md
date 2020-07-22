# ArduIndoor
Arduindoor es un proyecto universitario que permite el monitoreo de un cultivo, tomando mediciones de humedad y temperatura.
El mismo cuenta con una pantalla de visualización de los valores medidos en la actualidad y un gráfico con el histórico de las mismas.
Además, cuenta con la posibilidad de enviar notificaciones mediante la aplicación de mensajería Telegram.


El frontend está realizado con react.js ...

### Sensores
Las mediciones son hechas con los siguientes sensores, utilizando una placa Arduino:

- LM35 para temperatura
- ...
- ...

Arduino se conecta con el cliente MQTT de dos formas:

- Placa WiFi
- Puerto serial

La placa WiFi utilizada es ...

### Conexión Serial
La conexión mediante puerto serial es realizada con node.js, utilizando la librería serialport. Los mensajes son enviados por la placa Arduino y son de la forma [parámetro,valor]. Una vez recibidos, son enviados al servidor MQTT

Para iniciar la conexión vía puerto serie
```
npm run serial
```

### El servidor MQTT
El servidor MQTT es provisto por la librería mosquitto y se encarga de enviar los datos a sus clientes y además, envía los mismos a través de Web Socket, para que el panel de visualización pueda actualizarse en tiempo real.

### Notificaciones
Las notificaciones a Telegram están hechas con node.js, utilizando un cliente mqtt en la misma computadora, pudiendo ser configurable a un cliente mqtt externo.

Para iniciar las notificaciones
```
npm run notifications
```


### Configuración
Se pueden cambiar los siguientes valores de la configuración:

*  MQTT_CONNECTION: *default mqtt://localhost:1883*
*  SERIAL_PORT: *default /dev/ttyUSB0*
*  LOG_CONFIG: *default {
        "logFilePath": "logs/serial.log",
        "timestampFormat": "YYYY-MM-DD HH:mm:ss"
    }*
