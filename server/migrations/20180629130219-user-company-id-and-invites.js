'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('Invites', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING
        },
        code: {
          allowNull: false,
          type: Sequelize.STRING
        },
        companyId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      }),
      queryInterface.addColumn('Users', 'companyId', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Users', 'position', {
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Invites'),
      queryInterface.removeColumn('Users', 'companyId'),
      queryInterface.removeColumn('Users', 'position')
    ]);
  }
};
