const mqtt = require('mqtt')
const { MQTT_CONNECTION } = require('./configuration')
const get_logger = require('./logger')

const log = get_logger({ category: "NOTIFICATIONS" });

log.info(`Starting notifications listener.`)

const client = mqtt.connect(MQTT_CONNECTION)

client.on('connect', () => {
  log.info(`MQTT client connected at ${MQTT_CONNECTION}.`)
  client.subscribe('temperatura', function (err, grants) {
    grants.forEach(grant => log.info(`Successfully suscribed notifications to topic: ${grant.topic}`))
  })
  client.on('message', function (topic, message) {
  })
})
