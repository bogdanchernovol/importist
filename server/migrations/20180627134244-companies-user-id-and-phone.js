'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // renameColumn don't do anything without returned promise
    return queryInterface.addColumn('Companies', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER
    })
      .then(() => queryInterface.addColumn('Companies', 'userPhone', {
        type: Sequelize.STRING
      }))
      .then(() => queryInterface.renameColumn('Companies', 'addressLine12', 'addressLine2'))
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Companies', 'userId'),
      queryInterface.removeColumn('Companies', 'userPhone'),
      queryInterface.renameColumn('Companies', 'addressLine2', 'addressLine12')
    ]);
  }
};
