'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'First Name have too many characters!'
        }
      }
    },
    phone: {
      type: DataTypes.STRING(100),
    },
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
    password: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        // Remember to set the data value, otherwise it won't be validated
        this.setDataValue('password', val);
        const salt = bcrypt.genSaltSync(10);
        const  pass = bcrypt.hashSync(val, salt);
        this.setDataValue('passwordHash', pass);
      },
      validate: {
         isLongEnough: function (val) {
           if (val.length < 8) {
             throw new Error("Please choose a longer password")
            }
          }
       }
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING(50)
    },
    token: {
      type: DataTypes.TEXT,
      unique: true
    },
    statusRegistration: {
      type: DataTypes.STRING
    },
    verifyCode: {
      type: DataTypes.STRING
    },
    companyId: {
      type: DataTypes.INTEGER
    },
    position: {
      type: DataTypes.STRING
    },
  });

  User.authenticate = function(password, user) {
    if (bcrypt.compareSync(password, user.passwordHash))
      return user;
    else
      return false;
  };

  User.publicFields = ['id', 'fullName', 'email', 'role', 'statusRegistration', 'companyId', 'position'];

  return User;
};
