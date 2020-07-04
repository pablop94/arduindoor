const SerialPort = require('serialport');
const mqtt = require('mqtt')
const fs = require('fs')


const data = fs.readFileSync('./config.json')

	// if (err){
	// 	log.error('Cannot read configuration from config.json')
	// 	throw err
	// }

const { MQTT_CONNECTION, SERIAL_PORT, LOG_CONFIG } = JSON.parse(data)
const log = require('simple-node-logger').createSimpleFileLogger(LOG_CONFIG);

log.info(`Starting serial port bridge`)

log.info(`Reading configuration from config.json`)
const checkAvailable = portName => SerialPort.list().then(ports => ports.some(port => port.path === portName ));

checkAvailable(SERIAL_PORT).then(status => {
	if (!status){
		throw new Error(`Serial port at ${SERIAL_PORT} is not available`)
	}
	else{
		const serialPort = new SerialPort(SERIAL_PORT)
		const client = mqtt.connect(MQTT_CONNECTION)

		client.on('connect', () => {
			serialPort.on('data', (data) => {
				console.log(`Received data through serial port`)
				client.publish('home/casa', 'Hello mqtt')
			})
			log.info(`MQTT client connected at ${MQTT_CONNECTION}`)
		})
	}
}).catch(e => {
	log.error(`Serial port at ${SERIAL_PORT} is not available`)
})

