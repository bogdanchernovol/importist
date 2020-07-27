var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: process.env.LOG_LEVEL || 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
      timestamp: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};
