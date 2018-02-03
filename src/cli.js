#!/usr/bin/env node

'use strict';

var config = require('config'),
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

app.sendMessage(argv.to, argv.subject || '', argv.body || '').done();
