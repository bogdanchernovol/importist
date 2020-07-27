const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const constant = require('../utils/constant');
const Company = require('../services/company')();
const emailSender = require('../utils/mailtrap');
const Invite = require('../services/invite')();
const upload = require('../utils/fileLoader').upload;
const deleteFile = require('../utils/fileLoader').delete;
const Raven = require('../utils/raven');

if (process.env.NDOE_ENV !== 'production'){
    require('dotenv').config()
}

router.post('/uploadFile', upload.array('files', 5), async (req, res, next) => {
    try{
       if(!req.files || req.files && !req.files.length){
            res.status(400).send({error: 'File(s) don\'t uploaded!'});
            return;
       }
        res.status(200).send({files: req.files});
    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});
router.post('/deleteFile', async (req, res, next) => {
    try{
        const {file} = req.body;
        if(!file ){
                res.status(400).send({error: 'Incorrect file!'});
                return;
        }
        deleteFile(file, function (err,data){
              if (err) throw err;
              res.status(200).send({status: 'success'});
        });

    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});

// TODO: remove this after invite functionality will be added
router.get('/sendInvite', async (req, res, next) => {
    try {
      const {companyid, email} = req.query;

      const company = await Company.getCompanyById(companyid);
      if (!company) {
          return res.status(404).send({error: "Company not found"});
      }

      let invite = await Invite.getInvite(email, companyid);
      if (invite) {
        return res.status(400).send({error: "Invitation already sent"});
      }

      const hash = crypto.createHash('sha256').update('' + email + Date.now()).digest('hex');
      const code = crypto.createHmac('sha256', process.env.CRYPTO_SECRET).update(hash).digest('hex');
      invite = await Invite.create({
        email: email,
        code: code,
        companyId: companyid,
        status: constant.INVITATION_STATUS_PENDING
      })

      const link = `${req.protocol}://${req.get('host')}/accept-invite/${invite.code}`;

      await emailSender({
          message: `Hello,<br> Please Click on the link to join ${company.companyName} company.<br><a href=${link}>${link}</a></p>`,
          addresse: email,
          subject: `You have been invited by ${company.companyName} company`
      });

      return res.status(200).send({status: 'success'})
    }
    catch(err) {
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
})
module.exports = router;
