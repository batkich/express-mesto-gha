const User = require('../models/user');

const ERROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

const sendUser = (req, res) => {
  User.findById(req.params._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(ERROR_404).send({ message: 'Запрашиваемый пользователь не найден' });
      }
      const {
        _id, name, about, avatar,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') return res.status(ERROR_400).send({ message: 'Запрашиваемый пользователь не найден' });
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

const userCreate = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({
        user,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      return res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};

const findAll = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(ERROR_500).send({ message: 'Произошла ошибка' }));
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  const currentUser = req.user._id;
  const reqName = name;
  const reqAbout = about;

  User.findByIdAndUpdate(currentUser, {
    name, about,
  }, { runValidators: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      // eslint-disable-next-line no-use-before-define

      if (!reqName || !reqAbout) {
        return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      }
      const {
        // eslint-disable-next-line no-shadow
        _id, name, about, avatar,
      } = user;
      res.send({
        name, about, avatar, _id,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      if (err.name === 'CastError') return res.status(ERROR_404).send({ message: 'Запрашиваемый пользователь не найден' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const currentUser = req.user._id;

  User.findByIdAndUpdate(currentUser, {
    avatar,
  }, { runValidators: true })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      const {
        // eslint-disable-next-line no-shadow
        avatar,
      } = user;
      res.send({
        avatar,
      });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') return res.status(ERROR_400).send({ message: 'Переданы некорректные данные' });
      if (err.name === 'CastError') return res.status(ERROR_404).send({ message: 'Запрашиваемый пользователь не найден' });
      res.status(ERROR_500).send({ message: 'Произошла ошибка' });
    });
};

module.exports = {
  sendUser, findAll, userCreate, updateProfile, updateAvatar,
};
