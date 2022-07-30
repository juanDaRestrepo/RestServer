const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} is not registered in DB`);
  }
};

const emailExists = async(email) => {
   const emailExists = await User.findOne({email});
    if(emailExists){
        throw new Error('This email is already registered')
    }
}

module.exports = {
    isValidRole,
    emailExists
}