const userRout = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  sendUser, findAll, updateProfile, updateAvatar, selectedUser,
} = require('../controllers/users');

userRout.get('/', findAll);
userRout.get('/me', selectedUser);
userRout.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string(),
  }),
}), sendUser);
userRout.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
userRout.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = userRout;
