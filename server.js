'use strict'
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Message = require('./models/Message');
//const session = require('express-session');


const server = express();
mongoose.connect('mongodb://localhost/test');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post('/', function(req, res) {
  console.log('POST at /');
  res.send({message: 'You made contact with the server.'});
});

server.post('/message', function(req, res) {
  let name = req.body.name;
  let message = req.body.message;

  let newMessage = new Message();
  newMessage.name = name;
  newMessage.message = message;

  newMessage.save(function(err, savedMessage) {
    console.log('Message saved');
  });

  res.send({message: 'Message was sent'});
  console.log('POST at /message');
});

server.post('/log', function(req, res) {
  console.log('POST at /log');
  //res.send({message: 'Hello'});
  let messages = [];

  Message.find(function(err, message) {
    for (var i = 0; i < message.length; i++) {
      messages.push(message[i]);
    }
    res.send(messages);
  });
});

server.listen(3000, function() {
  console.log('Running on port 3000');
});

// module.exports = server;

//Add a list of connected clients
