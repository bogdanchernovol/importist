'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Companies', 'about', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'staff', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'revenue', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'established', {
        type: Sequelize.STRING
      }),

      queryInterface.addColumn('Companies', 'products', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'markets', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'customers', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'machineList', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'businessTerms', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'rndStaff', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'qcStaff', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'salesStaff', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'operationsStaff', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Companies', 'otherStaff', {
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Companies', 'about'),
      queryInterface.removeColumn('Companies', 'staff'),
      queryInterface.removeColumn('Companies', 'revenue'),
      queryInterface.removeColumn('Companies', 'established'),

      queryInterface.removeColumn('Companies', 'products'),
      queryInterface.removeColumn('Companies', 'markets'),
      queryInterface.removeColumn('Companies', 'customers'),
      queryInterface.removeColumn('Companies', 'machineList'),
      queryInterface.removeColumn('Companies', 'businessTerms'),
      queryInterface.removeColumn('Companies', 'rndStaff'),
      queryInterface.removeColumn('Companies', 'qcStaff'),
      queryInterface.removeColumn('Companies', 'salesStaff'),
      queryInterface.removeColumn('Companies', 'operationsStaff'),
      queryInterface.removeColumn('Companies', 'otherStaff')
    ]);
  }
};
