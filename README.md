# ArduIndoor

Arduindoor es un proyecto IoT que permite el monitoreo de un cultivo, registrando mediciones de humedad y temperatura del ambiente, utilizando una placa Arduino y el protocolo MQTT.

A través de un dashboard de visualización de datos, se presentan los valores medidos en tiempo real, así como un historial de registros expresados en gráficos.

Además, cuenta con la posibilidad de enviar notificaciones mediante la aplicación de mensajería Telegram.

## Arquitectura

El diseño de la arquitectura está basado principalmente en la utilización del protocolo mqtt para la comunicación entre el Arduino, el backend y el frontend.

La implementación consta de la conexión del Arduino a sensores de humedad y temperatura, y a su vez, la transmisión de los valores registrados a través del protocolo mqtt.

La publicación de los registros al servidor mqtt puede hacerse a través de puerto serie, o bien, mediante conexión WiFi utilizando, por ejemplo, un módulo especializado.

De esta manera, el Arduino publica los valores que registra de manera constante en los tópicos vínculados a la temperatura y la humedad que sean configurados.

### Sensores

Los sensores utilizados de manera alternativa en este proyecto son los siguientes:

- **LM35**: temperatura
- **DHT11**: temperatura y humedad

> Para conocer más sobre los sensores y cómo conectarlos, podés acceder al tutorial de desarrollo completo del proyecto.

### Servidor MQTT

Resulta necesario poner en marcha un servidor mqtt que se encargue de enviar los datos a sus clientes, y además, de transmitirlos a través de Web Socket, para que el panel de visualización pueda actualizarse en tiempo real.

Para ello, recomendamos la utilización de la librería Mosquitto.

> Para conocer como correr un servidor local, podés acceder al tutorial de desarrollo completo del proyecto.

### Conexión con servidor MQTT

#### Mediante conexión WiFi

Para conectar el Arduino a la red, se puede utilizar un módulo WiFi ```ESP2866```, y conectar el mismo al servidor broker MQTT.

> Conocé más sobre el módulo y cómo conectarlo al Arduino en el tutorial completo.

En el repositorio, dentro del directorio ```arduino``` también vas a encontrar el programa para grabar en la placa Arduino, listo para configurar con parámetros propios.

#### Mediante puerto serial

La conexión mediante puerto serial es realizada desde el backend con NodeJs.js, utilizando la librería ```serialport```.

El proyecto provee un script configurable para realizar dicha conexión. Será necesario ejecutarlo antes de inicializar el proyecto. Para ello, es necesario que el arduino permanezca conectado mediante el puerto USB a la computadora que esté corriendo localmente el script de conexión serial.

> Ver en la sección de configuración cómo hacerlo.

Los mensajes son enviados por la placa Arduino con el formato  ```[parámetro, valor]```.

Una vez recibidos, son enviados al servidor MQTT conectado.

## Configuración e inicio del proyecto

## Backend

El backend es el encargado de disponibilizar el historial de registros de temperatura obtenidos desde el servidor mqtt. Para ello, lee los datos publicados en el servidor mqtt para los tópicos ```temperatura``` y ```humedad```.

### Tech Stack 

- NodeJs y Express
- MongoDB
- Librería para conexión con servidor mqtt

A su vez, incluye la posibilidad de configurar un módulo de notificaciones, así como uno encargado de la conexión serial en caso de elegir esa alternativa.

#### Establecer la conexión serial

Se deben configurar los siguientes valores dentro del archivo ```config.json```:

##### Ejemplo

```
{
  "MQTT_CONNECTION": "mqtt://localhost:1883",
  "SERIAL_PORT": "/dev/ttyUSB0",
  "LOG_CONFIG": {
    "logFilePath": "logs/arduindoor.log",
    "timestampFormat": "YYYY-MM-DD HH:mm:ss"
  }
}
```

Para iniciar la conexión vía puerto serie, abrir una terminal, dirigirse al directorio del backend y correr el comendo:

```
npm run serial
```

### Inicial el backend

Una vez establecida la comunicación del Arduino con el servidor mqtt, sea por módulo WiFi o por puerto serie, estamos listxs para comenzar a registrar todos los datos, almacernarlos en una base de datos y disponibilizarlos al frontend.

Para ello, es necesario contar con ```MongoDB``` instalado, y creada la base de datos ```arduindor_db```.

> Si resulta necesario cambiar la configuración del puerto donde está corriendo el servidor de MongoDB (por defecto es el ```27017```), o bien el nombre de la base de datos, dirigirse al archivo de congifuración ```db.config.js``` dentro del directorio del backend.

Con todo listo, podemos correr el back entrando a su rectorio ```arduindoor/backend``` y correr el siguiente comando:

```
node server.js
```

El backend estará corriendo en el puerto ```3003```.

### Notificaciones

El módulo de notificaciones permite notificar a través de un bot de Telegram, nuevos valores de temperatura registrados.

Para configurarlo, es necesario crear un archivo ```./env``` en el directorio del backend para establecer el chatId al que llegarán las notificaciones, y el token del bot arduindoor, que es el siguiente:

```
"1394727673:AAFtvpGN1nQIG_Nzz62AF_TXKg9FzMDXsgg"
```

Para obtener el ```chatId```, en primer lugar es necesario activar el bot en nuestro Telegram: buscarlo por el nombre ```arduindoor```, y mandarle el mensaje ```/start```.
Luego, dirigirse a [ésta url](https://api.telegram.org/bot1394727673:AAFtvpGN1nQIG_Nzz62AF_TXKg9FzMDXsgg/getUpdates) para obtenr tu chatId.

El archivo .env debería lucir algo así: 

```
TELEGRAM_BOT_TOKEN="1394727673:AAFtvpGN1nQIG_Nzz62AF_TXKg9FzMDXsgg"
TELEGRAM_CHAT_ID=tuchatId
```

Para iniciar las notificaciones, abrir otra terminal en el directorio del backend y correr el comando:

```
npm run notifications
```


## Frontend

### Preparar el ambiente

Crear un archivo ```.env``` para la configuración de las variables de ambiente.

```REACT_APP_MQTT_IP="ip del servidor mqtt"
REACT_APP_HUMIDITY_TOPIC="nombre del tópico donde el sensor de humedad publicará los datos recolectados"
REACT_APP_TEMPERATURE_TOPIC="nombre del tópico donde el sensor de temperatura publicará los datos recolectados"
REACT_APP_API_URL="dirección ip de la API"
```

#### Ejemplo:

```REACT_APP_MQTT_IP="mqtt://0.0.0.0:9001"
REACT_APP_HUMIDITY_TOPIC="humedad"
REACT_APP_TEMPERATURE_TOPIC="temperatura"
REACT_APP_API_URL="http://localhost:3003/api"
```

> Para la variable de ambiente referida a la api, si utilizamos el backend provisto en el proyecto, configurar: ```"http://localhost:3003/api"```

### Iniciar la aplicación

Abrir una terminal en el directorio del frontend y lanzar la app :)

* ```cd arduindoor/frontend```
* ```npm run start```


> Si el backend está levantado, nuestro arduino conectado al servidor mqtt y registrando datos, entonces estamos listxs para ver los valores de temperatura y humedad en el dashboard !


---

Acá un tutorial/informe completo sobre el armado del proyecto :)

---

Algunos vectores han sido diseñados by [Vecteezy](https://www.vecteezy.com/free-vector/plants);

