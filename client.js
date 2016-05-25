#!/usr/bin/env node
'use strict'

const request = require('request-promise');
const vorpal = require('vorpal')();
const serverList = [];

let setOptions = {
  uri: undefined,
  body: {
    name: undefined
  }
}

let connect = function(callback) {
  let postOptions = {
    method: 'POST',
    json: true,
    uri: setOptions.uri,
    body: {
      name: setOptions.body.name
    }
  }
  console.log('Attempting to connect to ' + postOptions.uri);
  request(postOptions)
    .then(function(response) {
      console.log(response.message);
      callback();
    })
    .catch(function(err) {
      console.log(err);
    });
}

let message = function(command, callback) {
  let messageOptions = {
    method: 'POST',
    json: true,
    uri: setOptions.uri + 'message',
    body: {
      name: setOptions.body.name,
      message: command
    }
  }
  request(messageOptions)
    .then(function(response) {
      console.log(response.message);
      callback();
    })
    .catch(function(err) {
      console.log(err);
    });
}

let log = function(callback) {
  let logOptions = {
    method: 'POST',
    json: true,
    uri: setOptions.uri + 'log'
  }
  request(logOptions)
    .then(function(response) {
      let total = response.length - 1;

      for (var i = 0; i < response.length; i++) {
        let message = '\"' + response[i].message + '\"' + ' - ' + response[i].name;
        console.log(message);
        if(i == total)
          vorpal.ui.redraw.done();
      }
      callback();
    })
    .catch(function(err) {
      console.log(err);
    });
}

vorpal
  .mode('send')
  .description('Send a message to the server.')
  .delimiter('send =>')
  .action(function(command, callback) {
    message(command, callback);
  });

vorpal
  .command('log')
  .option('-a, --all', 'List all messages.')
  .description('View logs')
  .action(function(args, callback) {
    log(callback);
  });

vorpal
  .command('set <name> <uri>')
  .option('-n, --name', 'Set the name')
  .option('-u, --uri', 'Set the uri')
  .action(function(args, callback) {
    setOptions.body.name = args.name;
    setOptions.uri = args.uri;
    callback();
  });

vorpal
  .command('connect')
  .action(function(args, callback) {
    connect(callback);
    //callback();
  });

vorpal
  .mode('list')
  .description('View the server list')
  .delimiter('server-list =>')
  .action(function(command, callback) {
    if(command == 'show' || 'get') {
      for (var i = 0; i < serverList.length; i++) {
        console.log(serverList[i]);
      }
    }
    callback();
  });

vorpal
  .delimiter('converse~$')
  .show()
