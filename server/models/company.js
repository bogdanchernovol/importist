'use strict';
const countries = require('./../utils/countries');

module.exports = (sequelize, DataTypes) => {
  var Company = sequelize.define('Company', {
    companyName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Company Name have too many characters!'
        }
      }
    },
    logo: {
      type: DataTypes.STRING,
    },
    addressLine1: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Address Line 1 have too many characters!'
        }
      }
    },
    addressLine2: {
      type: DataTypes.STRING(100),
      validate: {
        len: {
          args: [1, 100],
          msg: 'Address Line 2 have too many characters!'
        }
      }
    },
    zip: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        len: {
          args: [1, 20],
          msg: 'Zip have too many characters!'
        }
      }
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isInList: (value) => {
          if (!countries.includes(value)) {
            throw new Error('Wrong country!');
          }
        }
      }
    },
    phone: {
      type: DataTypes.STRING(100)
    },
    website: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Website have too many characters!'
        }
      }
    },
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
    userPhone: {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
    },
    staff: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    revenue: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    established: {
      type: DataTypes.STRING(4),
      allowNull: false
    },
    products: {
      type: DataTypes.STRING,
    },
    markets: {
      type: DataTypes.STRING,
    },
    customers: {
      type: DataTypes.STRING,
    },
    machineList: {
      type: DataTypes.STRING,
    },
    businessTerms: {
      type: DataTypes.STRING,
    },
    rndStaff: {
      type: DataTypes.STRING,
    },
    qcStaff: {
      type: DataTypes.STRING,
    },
    salesStaff: {
      type: DataTypes.STRING,
    },
    operationsStaff: {
      type: DataTypes.STRING,
    },
    otherStaff: {
      type: DataTypes.STRING,
    }
  });

  Company.publicFields = [
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
  ];

  return Company;
};
