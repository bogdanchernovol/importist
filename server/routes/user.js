const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const _ = require('lodash');
const validator = require('validator');
const User = require('../services/user')();
const Company = require('../services/company')();
const constant  = require('../utils/constant');
const Invite = require('../services/invite')();
const Photo = require('../services/photo')();
const emailSender = require('../utils/mailtrap');
const Raven = require('../utils/raven');
const warningLog = require('../utils/warningLog')();
const logger = require('../config/logger');

if (process.env.NDOE_ENV !== 'production'){
    require('dotenv').config()
}

router.post('/signIn', async (req, res, next) => {
    logger.debug('/signIn');
    try{
        const {email, password} = req.body;
        if (!email || !password || email && typeof email !== 'string' ||
            password && typeof password !== 'string'){
                logger.debug('Invalid email or password type', email);
                res.status(403).send({error: "Data not valid!"});
                return;
        }
        let user = await User.getUserByEmail(email);
        if (!user){
            logger.debug('User not found', email);
            res.status(404).send({error: "We do not recognize this email"});
            return;
        }
        user = await User.authenticateUser(password, user);
        if (!user){
            logger.debug('User not authenticated', email);
            res.status(404).send({error: "Incorrect password"});
            return;
        }
        token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            user: _.pick(user, ['id', 'fullName', 'email', 'phone'])
        }, process.env.SECRET_TOKEN);

        await User.saveToken(user.id, token);
        logger.debug('Return 200');
        res.status(200).send({
            user:  User.collect(user),
            token
        });
    }
    catch(err){
        logger.error('Exception', err);
        logger.error('Exception', err.message);
        logger.debug('Return 500');
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});
router.post('/startSignUp', async (req, res, next) => {
    try{
        const {email, fullName} = req.body;
        if (!email || email && !validator.isEmail(email)){
                res.status(403).send({error: "Incorrect email"});
                return;
        }
        if (!fullName || fullName && typeof fullName !== 'string'){
                res.status(403).send({error: "Incorrect full name"});
                return;
        }
        const [user, created] = await User.startCreateUser({email, fullName, statusRegistration: constant.REGISTRATION_START});
        if (!created && user.statusRegistration !== constant.REGISTRATION_START){
            res.status(403).send({error: "Incorrect email"});
            return;
        }
        res.status(200).send({user: User.collect(user)});
    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});
router.post('/signUpCreatePass', async (req, res, next) => {
    logger.debug('/signUpCreatePass');
    try{
        const {password, confirmPassword, role, id, email} = req.body;
        logger.debug(role, id, email);
        if (!password || password && typeof password !== 'string' && password.length >= 8){
            logger.debug('Invalid password');
            res.status(403).send({error: "Incorrect password"});
            return;
        }
        if (!confirmPassword || confirmPassword !== password){
            logger.debug('confirm passwords do not match');
            res.status(403).send({error: "Incorrect confirm password"});
            return;
        }
        if (!role || typeof role !== 'string'){
            logger.debug('Invalid role', role);
            res.status(403).send({error: "Incorrect role"});
            return;
        }
        if (!id){
            logger.debug('Invalid id', id);
            res.status(403).send({error: "Incorrect user data"});
            return;
        }
        const verifyCode = Date.now();
        const link = `${req.protocol}://${req.get('host')}/verify-email/${id}/${verifyCode}`;
        const user = await User.updateUserPassRole({password, role, id, verifyCode, statusRegistration: constant.REGISTRATION_SEND_EMAIL});
        if (user){
            logger.debug('Sending verify link email');
            await emailSender({
                message: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>${link}</a></p>`,
                addresse: email,
                subject: "Please confirm your Email account"
            });
            logger.debug('Email sent');
        }
        logger.debug('Returning 200 Success');
        res.status(200).send('success');
    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});

router.post('/resetPass', async (req, res, next) => {
    try{
        const {password, confirmPassword, role, id} = req.body;
        if (!password || password && typeof password !== 'string' && password.length >= 8){
            res.status(403).send({error: "Incorrect password"});
            return;
        }
        if (!confirmPassword || confirmPassword !== password){
            res.status(403).send({error: "Incorrect confirm password"});
            return;
        }
        if (!role || typeof role !== 'string'){
            res.status(403).send({error: "Incorrect role"});
            return;
        }
        if (!id){
            res.status(403).send({error: "Incorrect user data"});
            return;
        }

        const user = await User.updateUserPassRole({password, role, id, verifyCode: '', statusRegistration: constant.PASSWORD_CHANGED});

        res.status(200).send('password reseted');
    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});

router.post('/verifyEmail', async (req, res, next) => {
    try{
        const {id, verifyCode} = req.body;
        if (!id || id && typeof id !== 'string'){
                res.status(403).send({error: "Incorrect user id"});
                return;
        }
        if (!verifyCode || verifyCode && typeof verifyCode !== 'string'){
                res.status(403).send({error: "Incorrect verify code"});
                return;
        }
        const user = await User.getUserById(parseInt(id));
        if (!user){
            res.status(404).send({error: "User not found"});
            return;
        }
        if (user.verifyCode !== verifyCode){
            res.status(404).send({error: "Verify code not valid"});
            return;
        }
        await User.updateStatusRegistrtion({id, statusRegistration: constant.REGISTRATION_EMAIL_VERIFIED});
        res.status(200).send({status: 'success', user: User.collect(user)});
    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});

router.post('/forgotPass', async (req, res, next) => {
    try{
        const {email} = req.body;
        if (!email || email && !validator.isEmail(email)){
            res.status(403).send({error: "Incorrect email"});
            return;
        }

        const user = await User.getUserByEmail(email);

        if (!user){
            res.status(403).send({error: "Incorrect user data"});
            return;
        }

        const verifyCode = Date.now();
        const link = `${req.protocol}://${req.get('host')}/reset-password/${user.id}/${verifyCode}`;

        await Promise.all([
            User.updateVerifyCode({id: user.id, statusRegistration: constant.FORGOT_PASSWORD, verifyCode}),
            emailSender({
                message: `Hello,<br> Please Click on the link to reset your email.<br><a href=${link}>${link}</a></p>`,
                addresse: email,
                subject: "Please confirm your Email account"
            })
        ]);

        res.status(200).send({status: 'success', user: User.collect(user)});
    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});

router.post('/completeRegistration', async (req, res, next) => {
  try{
      const company = _.pick(req.body, [
        'companyName',
        'logo',
        'addressLine1',
        'addressLine2',
        'zip',
        'country',
        'phone',
        'website',
        'fullName',
        'position',
        'email',
        'userPhone',
        'userId',
        'about',
        'staff',
        'revenue',
        'established',
        'products',
        'markets',
        'customers',
        'machineList',
        'businessTerms',
        'rndStaff',
        'qcStaff',
        'salesStaff',
        'operationsStaff',
        'otherStaff'
      ]);
      company.logo = company.logo.location;
      const imageFiles = req.body.imageFiles;

      const user = await User.getUserById(company.userId);

      if (!user){
          res.status(403).send({error: "Incorrect user data"});
          return;
      }

      const promises = [
          User.updateStatusRegistrtion({id: company.userId, statusRegistration: constant.REGISTRATION_COMPLETED}),
      ];

      await Company.create(company)
        .then(company => {
          if (imageFiles && imageFiles.length) {
            promises.concat(imageFiles.map(imageFile => Photo.create({companyId: company.id, location: imageFile.location})));
          }
          return Promise.all(promises);
        });

      res.status(200).send({status: 'success', company: Company.collect(company)});
  }
  catch(err){
      res.status(500).send({error: err.message});
      Raven.captureException(err);
  }
});

router.post('/completeRegistrationUser', async (req, res, next) => {
  try{
      const user = _.pick(req.body, [
        'email',
        'fullName',
        'password',
        'confirmPassword',
        'phone',
        'position'
      ]);

      const userModel = await User.getUserById(req.body.id);

      if (!userModel) {
          res.status(403).send({error: "Incorrect user data"});
          return;
      }
      if (!user.password || typeof user.password !== 'string') {
          res.status(403).send({error: "Incorrect password"});
          return;
      }
      if (!user.confirmPassword || user.confirmPassword !== user.password) {
          res.status(403).send({error: "Incorrect confirm password"});
          return;
      }

      userModel.email = user.email;
      userModel.fullName = user.fullName;
      userModel.password = user.password;
      userModel.phone = user.phone;
      userModel.position = user.position;
      userModel.statusRegistration = constant.REGISTRATION_COMPLETED;

      await userModel.save();

      res.status(200).send({status: 'success', user: User.collect(userModel)});
  }
  catch(err){
      res.status(500).send({error: err.message});
      Raven.captureException(err);
  }
});

router.post('/acceptInvite', async (req, res, next) => {
    try{
        const {code} = req.body;
        if (!code || typeof code !== 'string'){
            res.status(403).send({error: "Wrong invitation code"});
            return;
        }
        const invite = await Invite.getInviteByCode(code);

        if (!invite) {
            return res.status(404).send({error: "Invitation not found"});
        }

        const userExist = await User.getUserByEmail(invite.email);

        if (userExist && userExist.statusRegistration !== constant.REGISTRATION_EMAIL_VERIFIED) {
            return res.status(400).send({error: "User already exist"});
        }

        // TODO:if there will be possibility for user to participate in more then one company this needs to be rewritten
        if (!userExist) {
            if (invite.status === constant.INVITATION_STATUS_ACCEPTED) {
                return res.status(400).send({error: "Invitation alredy accepted"});

                invite.status = constant.INVITATION_STATUS_ACCEPTED;
                await invite.save();

                const user = await User.createInvitedUser({
                  email: invite.email,
                  fullName: ' ',
                  role: constant.USER,
                  companyId: invite.companyId,
                  statusRegistration: constant.REGISTRATION_EMAIL_VERIFIED
                });
                return res.status(200).send({status: 'success', user: User.collect(user)});
            }
        }
        return res.status(200).send({status: 'success', user: User.collect(userExist)});
    }
    catch(err){
        res.status(500).send({error: err.message});
        Raven.captureException(err);
    }
});

module.exports = router;
