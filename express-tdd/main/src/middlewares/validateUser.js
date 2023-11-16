const userName = (req, res, next) => {
  const user = req.body;
  if (user.username === null) {
    req.validationErrors = {
      username: 'username is required',
    };
  }
  next();
};

const userEmail = (req, res, next) => {
  const user = req.body;
  if (user.email === null) {
    req.validationErrors = {
      ...req.validationErrors,
      email: 'E-mail is required',
    };
  }
  next();
};

module.exports = {
  userName,
  userEmail,
};
