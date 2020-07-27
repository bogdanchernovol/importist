const Photo = require('../models').Photo;
const _ = require('lodash');

module.exports = function () {

  return Object.freeze({
    create,
    collect
  });
  async function create(photo){
    return await Photo.create(photo);
  }

  function collect(photo){
    return _.pick(photo, [
      'id',
      'companyId',
      'location'
    ]);
  }
};
