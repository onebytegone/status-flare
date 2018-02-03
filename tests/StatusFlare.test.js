'use strict';

var _ = require('underscore'),
    expect = require('expect.js'),
    rewire = require('rewire'),
    StatusFlare = rewire('../src/StatusFlare.js');

describe('StatusFlare', function() {
   var mockConsole = { log: _.noop },
       mockNodeMailer = { createTransport: _.noop },
       revert;

   beforeEach(function() {
      revert = StatusFlare.__set__({
         console: mockConsole,
         nodemailer: mockNodeMailer,
      });
   });

   afterEach(function() {
      revert();
   });

   it('is a class', function() {
      expect(StatusFlare).to.be.a('function');
   });

});
