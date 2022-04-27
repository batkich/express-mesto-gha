const cardRout = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  findAllCards, cardCreate, deleteCard, likeCard, deleteLikeCard,
} = require('../controllers/cards');

cardRout.get('/', findAllCards);
cardRout.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
    owner: Joi.string(),
  }),
}), cardCreate);
cardRout.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required(),
  }),
}), deleteCard);
cardRout.put('/:_id/likes', likeCard);
cardRout.delete('/:_id/likes', deleteLikeCard);

module.exports = cardRout;
