const bcrypt = require('bcrypt');
const User = require('../models/User');

const save = async (body) => {
  const hash = await bcrypt.hash(body.password, 10);
  const user = {
    ...body, //* with spread operator
    password: hash,
  };
  await User.create(user);

  // const user = Object.assign({}, req.body, { password: hash }); //* with Object.assign

  // const user = { //* normal object
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: hash,
  // };
};

module.exports = {
  save,
};
