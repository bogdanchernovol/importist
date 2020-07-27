const winston = require('winston');
winston.emitErrs = true;

const customColors = {trace: 'white', debug: 'green', info: 'green', warn: 'yellow', crit: 'red', fatal: 'red'};
const tsFormat = () => (new Date()).toLocaleTimeString();
const levels = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 };
const logger = new winston.Logger({
    colors: customColors,
    levels,
    transports: [
        new winston.transports.Console({  humanReadableUnhandledException: true, handleExceptions: true, colorize: true }),
        new winston.transports.File({
            name: 'info-file',
            level: 'silly',
            filename: process.env.PWD + '/access.log',   
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            timestamp: tsFormat,
        }),
        new winston.transports.File({
            name: 'error-file',
            level: 'error',
            filename: process.env.PWD + '/error.log',
            handleExceptions: true,
            json: true,
            colorize: false,
            timestamp: tsFormat,
        }),
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
}