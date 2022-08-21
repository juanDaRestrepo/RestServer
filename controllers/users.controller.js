const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user.model");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const restrictions = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(restrictions),
    User.find(restrictions).skip(Number(from)).limit(Number(limit))
  ]);

  res.json({
   total, users
  });
};

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json(user);
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json({
    user,
  });
};

const usersDelete = async(req, res = response) => {

  const { id } = req.params;

  //Deleting physically
  /* const user = await User.findByIdAndDelete( id ); */

  const user = await User.findByIdAndUpdate( id, {state: false})
  res.json({
    user
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};
