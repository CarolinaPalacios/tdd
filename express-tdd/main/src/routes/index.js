const router = require('express').Router();
const userRouter = require('./userRouter');
const validate = require('../middlewares/validateUser');

router.use('/users', validate.userName, validate.userEmail, userRouter);

module.exports = router;
