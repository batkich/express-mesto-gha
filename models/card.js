const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);

// eslint-disable-next-line max-len
// Здравствуйте, Айсалкын! Спасибо за ссылку, но, если честно сказать, к сожалению при чтении English документации я, мягко говоря испытываю
// определенные трудности (мало что понимаю :) ). Поэтому приходиться искать информацию
// на русском языке и собирать "по кускам". Хотя конечно понимаю, что без "Инглиша"
// стать нормальным разработчиком врядли получиться.
