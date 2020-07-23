# ArduIndoor

Arduindoor es un proyecto IoT que permite el monitoreo de un cultivo, registrando mediciones de humedad y temperatura del ambiente, utilizando una placa Arduino y el protocolo MQTT.

A través de un dashboard de visualización de datos, se presentan los valores medidos en tiempo real, así como un historial de registros expresados en gráficos.

Además, cuenta con la posibilidad de enviar notificaciones mediante la aplicación de mensajería Telegram.

## Arquitectura

El diseño de la arquitectura está basado principalmente en la utilización del protocolo mqtt para la comunicación entre el Arduino, el backend y el frontend.

La implementación consta de la conexión del Arduino a sensores de humedad y temperatura, y a su vez, la transmisión de los valores registrados a través del protocolo mqtt.

De esta manera, el Arduino publica los valores que registra de manera constante en los tópicos vínculados a la temperatura y la humedad en el servidor MQTT .

Desarrollamos dos alternativas posibles para la publicación de la temperatura en el mismo: 

### A. Envío de valores por red WiFi

El módulo ESP2866 permite a los microcontroladores conectarse a una red Wi-Fi y realizar conexiones TCP/IP sencillas. Por esa razón decidimos utilizarlo para la conexión al servidor MQTT, posibilitando la publicación de mensajes directamente desde el Arduino.

[Aquí](https://www.espressif.com/en/products/socs/esp8266) más datos técnicos del módulo ESP2866.

> Se trata de componente económico por su función y capacidad, que compramos por $540.

Antes de arrancar a programar la conexión con el servidor, hicimos una conexión de prueba del módulo con el Arduino siguiendo el esquemático descripto en [este artículo](http://www.teomaragakis.com/hardware/electronics/how-to-connect-an-esp8266-to-an-arduino-uno/). 
Una vez conectados, ejecutamos comandos directamente en el módulo para testear que pudiésemos conectarnos a una red WiFi utilizando la referencia de los comandos que encontramos [aquí](http://room-15.github.io/blog/2015/03/26/esp8266-at-command-reference/).

Una vez que todo estuvo chequeado, comenzamos a programar el código que ejecutamos en el Arduino. Para ello importamos distintas librerías útiles como:

```
#include "WiFiEsp.h" // módulo ESP2866
#include "PubSubClient.h" // cliente mqtt
#include "SoftwareSerial.h"
```
* [pubsubclient](https://github.com/knolleary/pubsubclient/releases/tag/v2.8)
* [WifiEsp](https://github.com/bportaluri/WiFiEsp)

El programa establece las siguientes instrucciones:

1. Importar librerías necesarias
2. Inicializar puerto serial
3. Inicializar software serial
4. Conectar sensores
5. Conexión del módulo ESP2866
6. Conexión a red WiFi
7. Conexión al servidor mqtt desde el cliente WiFi
8. Subscripción a tópicos temperatura y humedad
9. Registro de los valores de sensores (en loop)
10. Publicación de los valores registrados en los tópicos correspondientes a través de mqtt (en loop)

> El código resultante se encuentra en el repositorio publicado :)


### B. Implementación por puerto serial

La conexión al servidor mqtt también puede hacerse utilizando Node.js, leyendo los valores transmitidos por puerto serie desde el Arduino. Para ello utilizamos la librería ```serialport``` y la librería [mqtt](https://github.com/mqttjs/MQTT.js#publish) para Javascript.

> En el repositorio subimos el script configurable para realizar dicha conexión. 

Los mensajes son enviados por la placa Arduino a través del puerto serie con el formato ```[parámetro, valor]```.

Una vez recibidos, son enviados al servidor MQTT conectado.

---

## MQTT

##### Instalando Mosquitto

Mosquitto es el broker MQTT OpenSource que utilizamos para desarrollar el proyecto. Lo corremos localmente en el puerto por defecto 1883, y a su vez, lo configuramos para que transmita mensajes también por protocolo web sockets, de manera que pudiesemos obtener la data a través de un frontend web.

#### Instalación

Una alternativa posible es instalarlo [a través de Snap](https://snapcraft.io/mosquitto).

Cualquiera sea la manera, es necesario configurar un archivo para indicar el puerto para la transmisión poor web sockets.

En el caso de instalar mediante snap, estos son algunos comandos útiles que utilizamos:

##### Start Mosquitto broker

```sudo systemctl start snap.mosquitto.mosquitto.service```

##### Status Mosquitto broker

```sudo systemctl status snap.mosquitto.mosquitto.service```

##### Usar cliente mosquitto

```mosquitto_sub -h localhost -t temperatura -v```


El path del archivo de configuración de Mosquitto es el siguiente:

```/var/snap/mosquitto/common/mosquitto.conf```

Y una vez configurado queda así:

```
listener 9001
protocol websockets
listener 1883
protocol mqtt
```

## Arduino conectado a sensores de ambiente

#### DHT11

Este sensor dispone de un procesador interno que realiza el proceso de medición, proporcionando la data a través de una señal digital.

* Medición simultánea de temperatura y humedad
* Medición de temperatura entre 0 a 50, con una precisión de 2ºC
* Medición de humedad entre 20 a 80%, con precisión del 5%.
* Frecuencia de muestreo de 1 muestras por segundo (1 Hz)

[En este artículo se detalla cómo establecer la conexión con el Arduino.](https://create.arduino.cc/projecthub/pibots555/how-to-connect-dht11-sensor-with-arduino-uno-f4d239)


#### HL-69

Alternativamente también utilizamos este sensor de humedad del suelo.

## Backend

El backend es el encargado de disponibilizar el historial de registros de temperatura obtenidos desde el servidor mqtt. Para ello, lee los datos publicados en el servidor mqtt para los tópicos ```temperatura``` y ```humedad```.

### Tech Stack 

- NodeJs y Express
- MongoDB
- Librería para conexión con servidor mqtt

Con el propósito de almacenar el historial, de manera que sea posible estudiar la evolución de los valores en el tiempo, decidimos desarrollar un backend con Node.js que se subscribe al servidor mqtt, lee los datos correspondientes y los almacena en una base de datos orientada a documentos, como es MongoDB. A su vez, los procesa y expone en una API que desarrollamos utilizando [Express.js](https://expressjs.com/es/).

A su vez, desarrollamos un módulo de notificaciones, que permite el envío de mensajes a través de Telegram. Creamos un bot desde donde se publican los mensajes, siendo configurable el valor de temperatura que condiciona la emisión de una notificación.

## Frontend

Para crear un dashboard de visualización de los datos registrados, desarrollamos un aplicación web utilizando ReactJs. Desde ella se establece conexión tanto con el servidor mqtt como con la API desarrollada. En el primer caso, nos permite mostrar los valores en tiempo real que llegan desde el servidor mqtt, mientras en el segundo obtenemos la lista registros almacenados para poder renderizar un gráfico que muestre la evolución de los valores.

## Galería de imágenes

En el repositorio dentro del directorio ```Galería```, subimos fotografías del proceso :)
