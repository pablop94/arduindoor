const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline
const mqtt = require('mqtt')
const get_logger = require('./logger')

const { MQTT_CONNECTION, SERIAL_PORT } = require('./configuration')
const log = get_logger({ category: "SERIAL BRIDGE" })

log.info(`Starting serial port bridge.`)

function checkAvailable(portName) {
  return SerialPort.list().then(ports => ports.some(port => port.path === portName))
}

checkAvailable(SERIAL_PORT).then(status => {
  if (!status) {
    throw new Error(`Serial port at ${SERIAL_PORT} is not available.`)
  }
  else {
    const serialPort = new SerialPort(SERIAL_PORT, {
      baudRate: 9600
    })
    const parser = new Readline()
    serialPort.pipe(parser)
    const client = mqtt.connect(MQTT_CONNECTION)
    log.info(`Serial port at ${SERIAL_PORT} is connected.`)

    client.on('connect', () => {
      log.info(`MQTT client connected at ${MQTT_CONNECTION}.`)

      parser.on('data', data => {
        //formatear los datos: temperatura,30
        //formatear los datos: humedad,25
        client.publish(...data.split(','))
      })
    })
  }
}).catch(e => log.error(e.message))
