var AWS = require('aws-sdk');


if (process.env.NDOE_ENV !== 'production'){
    require('dotenv').config()
}
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY,  secretAccessKey: process.env.AWS_SECRET_KEY, region: 'eu-west-1'});

module.exports = function () {

    return Object.freeze({
      sendConfirmPasswordLink
    });

    async function sendConfirmPasswordLink(toAdress, senderAdress, link){
     
      var params = {
        Destination: { 
          ToAddresses: [
            toAdress
          ]
        },
        Message: { /* required */
          Body: { /* required */
            Html: {
              Charset: "UTF-8",
              Data: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>${link}</a></p>`
            },                
            },
            Subject: {
            Charset: 'UTF-8',
            Data: "Please confirm your Email account",
            }
          },
        Source: senderAdress, /* required */            
      };       
      
      // Create the promise and SES service object
      var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
      
      // Handle promise's fulfilled/rejected states
      sendPromise.then(
        function(data) {
          console.log(data.MessageId);
        }).catch(
          function(err) {
          console.error(err, err.stack);
        });        
      
            
    }
}