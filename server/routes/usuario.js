const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')
const app = express();
const Usuario = require('../models/usuario');




app.get('/usuario', function(req, res) {



  let desde = req.query.desde || 0
  // Lo tranforma a un numero, para cunado lo reciba no lo trasnfome a un string en el url
  desde = Number(desde)

  //toma el limiete desde el url
  let limite = req.query.limite || 5
  limite = Number(limite)

  // Usuario.find({}) recibe los parametros los cuales se desea buscar
  //TIpos de exclusiones
  Usuario.find({estado: true}, 'nombre email role google estado')
    //limit da la cantidad de usuario en mongoose
    // skip salta los usuarios
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {

      if (err) {
        return res.status(400).json({
          ok: false,
          err
        })
      }

      //Cuenta el total de usuarios
      // los parametros del count son los mismos del find
      Usuario.count({estado: true}, (err, conteo) => {

        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        })
      })



    })

});

app.post('/usuario', function(req, res) {

  let body = req.body

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  })

  usuario.save((err, usuarioDB) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    // usuarioDB.password = null

    res.json({
      ok: true,
      usuario: usuarioDB
    })

  })


});

app.put('/usuario/:id', function(req, res) {

  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado'])

  Usuario.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  }, (err, usuarioDB) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });

  })

});

app.delete('/usuario/:id', function(req, res) {

  let id = req.params.id

  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

  let cambiarEstado = {
    estado: false
  }

  Usuario.findByIdAndUpdate(id, cambiarEstado, {new: true}, (err, usuarioBorrado) => {

    if (err) {
      return res.status(400).json({
        ok: false,
        err
      })
    }
    // Para ver si un susario fue borrado anteriormente
    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }})
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado
    })

  })


});

module.exports = app;
