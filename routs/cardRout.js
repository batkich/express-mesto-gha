const cardRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findAllCards, cardCreate, deleteCard, likeCard, deleteLikeCard,
} = require('../controllers/cards');

cardRout.get('/', findAllCards);
cardRout.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri().min(12),
    owner: Joi.string(),
  }),
}), cardCreate);
cardRout.delete('/:_id', deleteCard);
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
