'use strict';

var _ = require('underscore'),
    Q = require('q'),
    Class = require('class.extend'),
    nodemailer = require('nodemailer');

module.exports = Class.extend({

   init: function(options) {
      if (!options || !options.email) {
         throw new Error('options.email was not provided when creating an instance of StatusFlare');
      }

      this._transporter = nodemailer.createTransport({
         service: options.email.service,
         host: options.email.host,
         port: options.email.port,
         secure: options.email.secure,
         auth: {
            user: options.email.account.user,
            pass: options.email.account.pass,
         },
      });

      this._baseMessageOptions = {
         from: options.email.account.from || options.email.account.user,
      };
   },

   sendMessage: function(to, subject, body) {
      var options;

      console.log('Sending "%s" of length %s to "%s"...', subject, body.length, to);

      options = _.extend(this._baseMessageOptions, {
         to: to,
         subject: subject,
         text: body,
      });

      return Q.ninvoke(this._transporter, 'sendMail', options)
         .then(function() {
            console.log('Sent "%s" to "%s"', subject, to);
         });
   },

});
