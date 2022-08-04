const Role = require('../models/role.model');
const User = require('../models/user.model');

const isValidRole = async (role = "") => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role ${role} is not registered in DB`);
  }
};

const emailExists = async(email = '') => {
   const emailExists = await User.findOne({email});
    if(emailExists){
        throw new Error('This email is already registered')
    }
}

const userByIdExists = async( id ) => {
  const userExists = await User.findById(id);
   if(!userExists){
       throw new Error(`The user with the ${ id } does not exists.`)
   }
}


module.exports = {
    isValidRole,
    emailExists,
    userByIdExists 
}