#!/usr/bin/env node

'use strict';

var Q = require('q'),
    config = require('config'),
    getStdin = require('get-stdin'),
    StatusFlare = require('./StatusFlare'),
    opts = { 'string': [ 'to', 'subject', 'body' ] },
    argv = require('minimist')(process.argv.slice(2), opts),
    app;

if (!argv.to) {
   throw new Error('An email address must be provided using `--to <address>`');
}

app = new StatusFlare({
   email: config.email,
});

Q.invoke(getStdin)
   .then(function(stdinBody) {
      var body = stdinBody;

      if (!body.trim()) {
         body = argv.body;
      }

      return app.sendMessage(argv.to, argv.subject || '', body || '');
   })
   .done();
