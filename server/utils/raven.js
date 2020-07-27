
var Raven = require('raven');

if (process.env.NDOE_ENV !== 'production'){
    require('dotenv').config()
}
const raven = Raven.config(process.env.SENTRY_API_KEY,  {
    captureUnhandledRejections: true
  }).install();
module.exports = raven;