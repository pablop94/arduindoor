const fs = require('fs')
const configContent = fs.readFileSync('./config.json')

module.exports = JSON.parse(configContent)
