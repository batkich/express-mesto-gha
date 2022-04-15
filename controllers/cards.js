const Card = require('../models/card');

const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

const findAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка' }));
};

const cardCreate = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user;
  Card.create({
    name, link, owner,
  })

    .then((card) => {
      const {
        // eslint-disable-next-line no-shadow
        likes, _id, name, link, owner,
      } = card;
      res.send({
        likes, _id, name, link, owner,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!card) {
        return res.status(ERROR_404).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      const {
        likes, _id, name, link, owner,
      } = card;
      res.send({
        likes, _id, name, link, owner,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_400).send({ message: 'Запрашиваемая карточка не найдена' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!req.user) {
        return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      }
      const {
        likes, _id, name, link, owner,
      } = card;
      res.send({
        likes, _id, name, link, owner,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_400).send({ message: 'Запрашиваемая карточка не найдена' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};

const deleteLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user } },
    { new: true },
  )
    // eslint-disable-next-line consistent-return
    .then((card) => {
      if (!req.user) {
        return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      }
      const {
        likes, _id, name, link, owner,
      } = card;
      res.send({
        likes, _id, name, link, owner,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_404).send({ message: 'Запрашиваемая карточка не найдена' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  findAllCards, cardCreate, deleteCard, likeCard, deleteLikeCard,
};
