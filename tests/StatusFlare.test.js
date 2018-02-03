'use strict';

var _ = require('underscore'),
    sinon = require('sinon'),
    expect = require('expect.js'),
    rewire = require('rewire'),
    StatusFlare = rewire('../src/StatusFlare.js'),
    testEmailConfig;

testEmailConfig = {
   service: 'gmail',
   account: {
      from: 'from field',
      user: 'user field',
      pass: 'pass field',
   },
};

describe('StatusFlare', function() {
   var mockConsole = { log: _.noop },
       mockNodeMailer = { createTransport: _.noop },
       mockOS = { hostname: _.noop },
       revert;

   beforeEach(function() {
      revert = StatusFlare.__set__({
         console: mockConsole,
         nodemailer: mockNodeMailer,
         os: mockOS,
      });
   });

   afterEach(function() {
      revert();
   });

   it('is a class', function() {
      expect(StatusFlare).to.be.a('function');
   });

   describe('_formatFromField', function() {
      var statusFlare,
          hostnameStub;

      beforeEach(function() {
         hostnameStub = sinon.stub(mockOS, 'hostname');
         statusFlare = new StatusFlare({ email: testEmailConfig });
      });

      afterEach(function() {
         hostnameStub.restore();
      });

      it('ignores an empty from field', function() {
         expect(statusFlare._formatFromField(undefined)).to.be(undefined);
      });

      it('replaces "STATUSFLAREHOST" with the system\'s host name', function() {
         var from = 'Status Flare @ STATUSFLAREHOST <statusflare@example.com>';

         hostnameStub.returns('CurrentHost');
         expect(statusFlare._formatFromField(from)).to.be('Status Flare @ CurrentHost <statusflare@example.com>');
      });

   });

});
