const userRout = require('express').Router();

const {
  sendUser, findAll, userCreate, updateProfile, updateAvatar,
} = require('../controllers/users');

userRout.get('/', findAll);
userRout.get('/:_id', sendUser);
userRout.post('/', userCreate);
userRout.patch('/me', updateProfile);
userRout.patch('/me/avatar', updateAvatar);

module.exports = userRout;
