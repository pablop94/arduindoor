

const goodHumidityValue = 50;
const goodTemperatureValue= 27;

export function getTemperatureAdvice(temp) {
    return temp > goodTemperatureValue ? "La temperatura está demasiado alta." : "Es una buena temperatura." 
}

export function getHumidityAdvice(hum) {
    return hum > goodHumidityValue ? "Buena humedad :)" : "El ambiente está demasiado seco." 
}