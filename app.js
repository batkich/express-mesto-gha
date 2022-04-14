const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const userRout = require('./routs/userRout');

const cardRout = require('./routs/cardRout');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '6255af9624ee4d91a6497dda',
  };

  next();
});

app.use('/users', userRout);
app.use('/cards', cardRout);
app.use('/', (req, res) => {
  res.status(404).send({ message: 'Нет такой страницы' });
});

app.listen(PORT);
