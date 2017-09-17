let dsConfig
let env = process.env['NODE_ENV']
if (env === 'development') {
  dsConfig = require('./dsConfig.dev.json')
} else {
  dsConfig = require('./dsConfig.prod.json')
}

export default dsConfig
