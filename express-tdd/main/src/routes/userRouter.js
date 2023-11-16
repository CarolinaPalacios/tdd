const userService = require('../service/userService');
const userRouter = require('express').Router();

userRouter.post('/', async (req, res) => {
  if (req.validationErrors) {
    return res.status(400).send({
      validationErrors: req.validationErrors,
    });
  }
  await userService.save(req.body);

  return res.send({ message: 'User created' });
});

module.exports = userRouter;
