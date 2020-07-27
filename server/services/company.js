const Company = require('../models').Company;
const _ = require('lodash');

module.exports = function () {

  return Object.freeze({
    create,
    getCompanyById,
    collect
  });
  async function create(company){
    return await Company.create(company);
  }
  async function getCompanyById(id){
    return await Company.findById(id);
  }

  function collect(company){
    return _.pick(company, [
      'id',
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
  }
};
