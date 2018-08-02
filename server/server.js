require('./config/config');

const colors = require('colors');

const express = require('express');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));



mongoose.connect('mongodb://localhost:27017/cafe', (err,res) => {

  if (err) {
    throw err;
  }else {

    console.log('Base de datos online'.bgGreen);
  }
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT.bgRed);
});
