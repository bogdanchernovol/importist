const Invite = require('../models').Invite;
const _ = require('lodash');

module.exports = function () {

  return Object.freeze({
    create,
    getInvite,
    getInviteByCode,
    collect
  });
  async function create(company){
    return await Invite.create(company);
  }
  async function getInvite(email, companyId){
    return await Invite.findOne({where:{email, companyId}});
  }
  async function getInviteByCode(code){
    return await Invite.findOne({where:{code}});
  }

  function collect(company){
    return _.pick(company, [
      'id',
      'email',
      'code',
      'companyId',
      'status'
    ]);
  }
};
