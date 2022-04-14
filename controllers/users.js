const User = require('../models/user');

const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

const sendUser = (req, res) => {
  User.findById(req.params._id)
    .then((user) => {
      const {
        _id, name, about, avatar,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_404).send({ message: 'Запрашиваемый пользователь не найден' });
      return res.status(500).send({ message: 'Произошла ошибка' })
    });
}

const userCreate = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      const {
        _id, newname, newabout, newavatar,
      } = user;
      res.send({
        name: newname, about: newabout, avatar: newavatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      return res.status(ERROR_500).send({ message: 'Произошла ошибка' })
    });
}

const findAll = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(err => res.status(ERROR_500).send({ message: 'Произошла ошибка' }));
}

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const currentUser = req.user._id;

  User.findByIdAndUpdate(currentUser, {
    name, about,
  }, { new: true })
    .then((user) => {
      if (!name || !about) {
        return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      }
      const {_id, name, about, avatar} = user;
      res.send({ name, about, avatar, _id});
    })
    .catch(err => {
      if (err.name === 'CastError') return res.status(ERROR_404).send({ message: 'Запрашиваемый пользователь не найден' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' })
    });
}

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const currentUser = req.user._id;

  User.findByIdAndUpdate(currentUser, {
    avatar,
  }, { new: true })
    .then((user) => {
      if (!avatar) {
        return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      }
      const {_id, name, about, avatar} = user;
      res.send({ name, about, avatar, _id});
    })
    .catch(err => {
      if (err.name === 'CastError') return res.status(ERROR_404).send({ message: 'Запрашиваемый пользователь не найден' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
}

module.exports = {
  sendUser, findAll, userCreate, updateProfile, updateAvatar,
}