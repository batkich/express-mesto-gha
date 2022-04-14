const cardRout = require('express').Router();

const {
  findAllCards, cardCreate, deleteCard, likeCard, deleteLikeCard,
} = require('../controllers/cards');

cardRout.get('/', findAllCards);
cardRout.post('/', cardCreate);
cardRout.delete('/:_id', deleteCard);
cardRout.put('/:_id/likes', likeCard);
cardRout.delete('/:_id/likes', deleteLikeCard);

module.exports = cardRout;
