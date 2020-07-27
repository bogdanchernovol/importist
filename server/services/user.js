const User = require('../models').User;
const _ = require('lodash');

module.exports = function () {

  return Object.freeze({
    getUsers,
    getUserById,
    createUser,
    createInvitedUser,
    startCreateUser,
    updateUser,
    updateUserPassRole,
    updateStatusRegistrtion,
    updateVerifyCode,
    deleteUser,
    saveToken,
    getUserByToken,
    getUserByEmail,
    authenticateUser,
    collect
  });

  async function getUsers(){
    return await User.findAll();
  }
  async function authenticateUser(password, user){
    return await User.authenticate(password, user);
  }

  async function getUserById(id){
    return await User.findById(id);
  }
  async function saveToken(id, token){
    return await User.update({token}, { where: { id: id}});
  }
  async function getUserByToken(token){
    return await User.findOne({where:{token}});
  }
  async function getUserByEmail(email){
    return await User.findOne({ where: { Email: email }});
  }
  async function createInvitedUser(user){
    return await User.create(user);
  }
  async function createUser(user){
    return await User.findOrCreate({
      where: {email: user.email},
      defaults: {
        fullName: user.fullName,
        password: user.password.toString(),
        role: user.role,
        phone: user.phone,
        statusRegistration: user.statusRegistration
      }
    });
  }
  async function startCreateUser(user){
    return await User.findOrCreate({
      where: {email: user.email},
      defaults: {
        fullName: user.fullName,
        statusRegistration: user.statusRegistration
      }
    });
  }
  async function updateStatusRegistrtion({id, statusRegistration}){
    return await User.update({
        statusRegistration
      },
      { where: {id}},
    );
  }
  async function updateUserPassRole(user){
    return await User.update(
      {
        password: user.password.toString(),
        role: user.role,
        verifyCode: user.verifyCode.toString(),
      },
      { where: { id:  user.id}},
    );

  }
  async function updateVerifyCode(user){
    return await User.update(
      {
        verifyCode: user.verifyCode.toString(),
        statusRegistration: user.statusRegistration
      },
      { where: { id:  user.id}},
    );

  }
  async function updateUser(user){
    if (user.Password){
      return await User.update(
        {
          email: user.email,
          fullName: user.fullName,
          password: user.password.toString(),
          role: user.role,
          phone: user.phone,
          position: user.position,
        },
        { where: { id:  user.id}},
      );
    }
    return await User.update(
      {
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          phone: user.phone,
      },
      { where: { id:  user.id}},
    );

  }

  async function deleteUser(id){
    return await User.destroy(
      { where: { id:  id}}
    );
  }

  function collect(user){
    return _.pick(user, ['id', 'fullName', 'email', 'phone', 'role', 'statusRegistration', 'createdAt', 'updatedAt']);
}
};
