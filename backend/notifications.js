const mqtt = require('mqtt')
const { MQTT_CONNECTION, TEMPERATURE_LIMIT, HUMIDITY_LIMIT } = require('./configuration')
const get_logger = require('./logger')
const axios = require('axios')
const URL = require('url')

const log = get_logger({ category: "NOTIFICATIONS" });
let LAST_HUMIDITY_SENT = Number.MIN_SAFE_INTEGER
let LAST_TEMPERATURE_SENT = Number.MIN_SAFE_INTEGER

log.info(`Starting notifications listener.`)

const client = mqtt.connect(MQTT_CONNECTION)
let sent = false
client.on('connect', () => {
  log.info(`MQTT client connected at ${MQTT_CONNECTION}.`)
  client.subscribe('temperatura', function (err, grants) {
    if (err)
      log.error(`Error suscribing notifications: ${err}`)
    grants.forEach(grant => log.info(`Successfully suscribed notifications to topic: ${grant.topic}`))
  })
  client.on('message', function (topic, message) {
    const value = parseFloat(message)
    if (topic === "humedad" && value > HUMIDITY_LIMIT && value !== LAST_HUMIDITY_SENT) {
      LAST_HUMIDITY_SENT = value
      sendTelegramNotification(getMessage(`Cuidado la humedad sobrepasó el valor límite de ${HUMIDITY_LIMIT} y su valor actual es ${message}`))
    }
    if (topic === "temperatura" && value > TEMPERATURE_LIMIT && value !== LAST_TEMPERATURE_SENT) {
      LAST_TEMPERATURE_SENT = value
      sendTelegramNotification(getMessage(`Cuidado la temperatura sobrepasó el valor límite de ${TEMPERATURE_LIMIT} y su valor actual es ${message}`))
    }
  })
})

function sendTelegramNotification(url) {
  axios.get(url).then(response => {
    log.info(`Message sent: ${url}`)
  }).catch((err) => {
    log.error(err)
    log.error(`Error URL: ${url}`)
  })
}

function getMessage(notification) {
  return encodeURI(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&parse_mode=Markdown&text=${notification}`)
}
