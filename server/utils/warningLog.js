const Raven = require('./raven');

module.exports = function () {
    return Object.freeze({
        sendWarning
    });

    function sendWarning(message){
        if (process.env.NODE_ENV !== 'production'){
            Raven.captureMessage(message, {
                level: 'warning' // one of 'info', 'warning', or 'error'
            });
        }        
    }
}