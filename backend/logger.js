const logger = require('simple-node-logger')
const { LOG_CONFIG } = require('./configuration')

function get_logger(extraOpts) {
  const { category } = extraOpts
  return logger.createSimpleFileLogger({ ...LOG_CONFIG, ...extraOpts, category: `[${category}]` });
}

module.exports = get_logger