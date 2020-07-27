'use strict';

module.exports = (sequelize, DataTypes) => {
  var Photo = sequelize.define('Photo', {
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Photo.publicFields = [
    'id',
    'location',
    'companyId'
  ];

  return Photo;
};
