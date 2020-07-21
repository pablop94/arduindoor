const mqtt = require('mqtt')
const { MQTT_CONNECTION } = require('./configuration')
const get_logger = require('./logger')
const axios = require('axios')

const log = get_logger({ category: "NOTIFICATIONS" });

log.info(`Starting notifications listener.`)

const client = mqtt.connect(MQTT_CONNECTION)
let sent = false
client.on('connect', () => {
  log.info(`MQTT client connected at ${MQTT_CONNECTION}.`)
  client.subscribe('temperatura', function (err, grants) {
    if (err)
      log.error(`Error when suscribing to notifications ${err}`)
    grants.forEach(grant => log.info(`Successfully suscribed notifications to topic: ${grant.topic}`))
  })
  client.on('message', function (topic, message) {
    const send_text = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&parse_mode=Markdown&text=${message.toString()}`
    if (!sent) {
      sent = true
      axios.get(send_text).then(response => {
        log.info(`Message sent: ${JSON.parse(message.toString())}`)
      }).catch((err) => {
        log.error(err)
      })
    }
  })
})
