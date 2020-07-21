#include <ArduinoJson.h>
#include <DHT_U.h>
#include <DHT.h>

#include "WiFiEsp.h"
#include "PubSubClient.h"
#include "SoftwareSerial.h"

SoftwareSerial Serial1(10, 11);

#define ESP8266_BAUD 9600
#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

char ssid[] = "ssid";
char pass[] = "pswd";


//Contador para el envio de datos
unsigned long lastSend;
//Nombre o IP del servidor mosquitto
char server[50] = "ipMosquito";
//Inicializamos el objeto de cliente esp
WiFiEspClient espClient;

//Iniciamos el objeto subscriptor del cliente 
//con el objeto del cliente
PubSubClient client(espClient);

int status = WL_IDLE_STATUS;

#define humedad_topico "humedad"
#define temperatura_topico "temperatura"

void setup()
{
    // Open up communications for arduino serial and esp serial at same rate
    Serial.begin(9600);
    Serial1.begin(9600);
    // Initialize the esp module
    WiFi.init(&Serial1);
    
    // Start connecting to wifi network and wait for connection to complete
    while (status != WL_CONNECTED)
    {
        Serial.print("Conecting to wifi network: ");
        Serial.println(ssid);

        status = WiFi.begin(ssid, pass);
    }

    // Once we are connected log the IP address of the ESP module
    Serial.print("IP Address of ESP8266 Module is: ");
    Serial.println(WiFi.localIP());
    Serial.println("You're connected to the network");
    
    Serial.println(F("Inicializando sensor de temperatura y humedad..."));
    dht.begin();
    
    //Colocamos la referencia del servidor y el puerto
    client.setServer( server, 1883 );
    lastSend = 0;
}


void loop() {
//Validamos si el modulo WiFi aun esta conectado a la red
    status = WiFi.status();
    if(status != WL_CONNECTED) {
        //Si falla la conexión, reconectamos el modulo
        reconnectWifi();
    }

    //Validamos si esta la conexión del servidor
    if(!client.connected() ) {
        //Si falla reintentamos la conexión
        reconnectClient();
    }


    //Creamos un contador para enviar la data cada 2 segundos
    if(millis() - lastSend > 60000 ) {
        sendDataTopic();
        getAndSendTemperatureAndHumidityData();
        lastSend = millis();
    }

    client.loop();
}

void sendDataTopic()
{
    Serial.println("sendDataTopic");
    // Prepare a JSON payload string
    String payload = "Enviando datos";

    // Send payload
    char attributes[100];
    payload.toCharArray( attributes, 100 );
    client.publish( "temperatura", attributes );
    Serial.println( attributes );
}

void getAndSendTemperatureAndHumidityData()
{
  Serial.println("Registrando datos de temperatura y humedad");

  // Reading temperature or humidity takes about 250 milliseconds!
  float humidity = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float temperature = dht.readTemperature();

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
  }
    float hic = dht.computeHeatIndex(temperature, humidity, false);
    Serial.print(F(" Humidity: "));
    Serial.print(humidity);
    Serial.print(F("%  Temperature: "));
    Serial.print(temperature);
    Serial.print(F("°C "));
    Serial.print(F("°F  Heat index: "));
    Serial.print(F("°C "));
    Serial.print(hic);
    Serial.println(F("°F"));


   client.publish(temperatura_topico, String(temperature).c_str());
   client.publish(humedad_topico, String(humidity).c_str());

}

void reconnectWifi() {
    Serial.println("Iniciar conección a la red WIFI");
    while(status != WL_CONNECTED) {
        Serial.print("Intentando conectarse a WPA SSID: ");
        Serial.println(ssid);
        //Conectar a red WPA/WPA2
        status = WiFi.begin(ssid, pass);
        delay(500);
    }
    Serial.println("Conectado a la red WIFI");
}

void reconnectClient() {
    //Creamos un loop en donde intentamos hacer la conexión
    while(!client.connected()) {
        Serial.print("Conectando a: ");
        Serial.println(server);
        //Creamos una nueva cadena de conexión para el servidor
        //e intentamos realizar la conexión nueva
        String clientId = "ESP8266Client-" + String(random(0xffff), HEX);
        if(client.connect(clientId.c_str())) {
            Serial.println("[DONE]");
        } else {
            Serial.print( "[FAILED] [ rc = " );
            Serial.print( client.state() );
            Serial.println( " : retrying in 5 seconds]" );
            delay( 5000 );
        }
    }
}
