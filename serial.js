const SerialPort = require('serialport');
const mqtt = require('mqtt')
const fs = require('fs')
const logger = require('simple-node-logger')


const configContent = fs.readFileSync('./config.json')
const { MQTT_CONNECTION, SERIAL_PORT, LOG_CONFIG } = JSON.parse(configContent)
const log = logger.createSimpleFileLogger(LOG_CONFIG);

log.info(`Starting serial port bridge.`)

function checkAvailable(portName) {
	return SerialPort.list().then(ports => ports.some(port => port.path === portName))
} 

checkAvailable(SERIAL_PORT).then(status => {
	if (!status){
		throw new Error(`Serial port at ${SERIAL_PORT} is not available.`)
	}
	else{
		const serialPort = new SerialPort(SERIAL_PORT)
		const client = mqtt.connect(MQTT_CONNECTION)
		log.info(`Serial port at ${SERIAL_PORT} is connected.`)

		client.on('connect', () => {
			log.info(`MQTT client connected at ${MQTT_CONNECTION}.`)

			serialPort.on('data', (data) => {
				client.publish('home/casa', 'Hello mqtt')
			})
		})
	}
}).catch(e => log.error(e.message))
