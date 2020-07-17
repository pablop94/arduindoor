const logger = require('simple-node-logger')
const { LOG_CONFIG } = require('./configuration')

function get_logger(extraOpts){
  return logger.createSimpleFileLogger({...LOG_CONFIG, ...extraOpts});
}

module.exports = get_logger