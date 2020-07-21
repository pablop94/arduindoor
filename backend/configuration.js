const fs = require('fs')
const configContent = fs.readFileSync('./config.json')
require('dotenv').config()

module.exports = JSON.parse(configContent)
