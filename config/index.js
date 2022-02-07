const dbBase = require('./dbConfig')
const commonOptions = require('./common')

module.exports = {
  dababase: dbBase,
  ...commonOptions
}