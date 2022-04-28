const userRout = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  sendUser, findAll, updateProfile, updateAvatar, selectedUser,
} = require('../controllers/users');

userRout.get('/', findAll);
userRout.get('/me', selectedUser);
userRout.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().min(24).max(24),
  }),
}), sendUser);
userRout.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().required().regex(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i),
  }),
}), updateProfile);
userRout.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
}), updateAvatar);

module.exports = userRout;
