const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user.model");

const usersGet = async(req = request, res = response) => {
  
  const { limit = 5, from = 0 } = req.query;
  
  const users = await User.find()
    .skip(Number(from))
    .limit(Number(limit));

  res.json({
    users,
  });
};

const usersPut = async(req, res = response) => {
  const id = req.params.id;
  const {_id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate( id, rest );

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

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controller",
  });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
};
