'use strict';

module.exports = (sequelize, DataTypes) => {
  var Invite = sequelize.define('Invite', {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [1, 255],
          msg: 'E-mail have too many characters!'
        },
        isEmail: true,
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Invite.publicFields = [
    'id',
    'email',
    'code',
    'companyId',
    'status'
  ];

  return Invite;
};
