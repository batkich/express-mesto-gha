const cardRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const {
  findAllCards, cardCreate, deleteCard, likeCard, deleteLikeCard,
} = require('../controllers/cards');

cardRout.get('/', findAllCards);
cardRout.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().regex(/(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i),
    owner: Joi.string(),
  }),
}), cardCreate);
cardRout.delete('/:_id', auth, celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().min(24).max(24),
  }),
}), deleteCard);
cardRout.put('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().min(24).max(24),
  }),
}), likeCard);
cardRout.delete('/:_id/likes', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().min(24).max(24),
  }),
}), deleteLikeCard);

module.exports = cardRout;
