var utils = require('../lib/utils');

var fs = require('fs'),
    path = require('path'),
    inspect = require('util').inspect,
    assert = require('assert');

var t = -1,
    group = path.basename(__filename, '.js') + '/',
    fixturesdir = path.join(__dirname, 'fixtures');

var tests = [
  { run: function() {
      var what = this.what,
          r;

      assert.strictEqual(r = utils.readInt(new Buffer([0,0,0]), 0),
                         false,
                         makeMsg(what, 'Wrong result: ' + r));
      next();
    },
    what: 'readInt - without stream callback - failure #1'
  },
  { run: function() {
      var what = this.what,
          r;

      assert.strictEqual(r = utils.readInt(new Buffer([]), 0),
                         false,
                         makeMsg(what, 'Wrong result: ' + r));
      next();
    },
    what: 'readInt - without stream callback - failure #2'
  },
  { run: function() {
      var what = this.what,
          r;

      assert.strictEqual(r = utils.readInt(new Buffer([0,0,0,5]), 0),
                         5,
                         makeMsg(what, 'Wrong result: ' + r));
      next();
    },
    what: 'readInt - without stream callback - success'
  },
  { run: function() {
      var what = this.what,
          callback = function() {},
          stream = {
            _cleanup: function(cb) {
              cleanupCalled = true;
              assert(cb === callback, makeMsg(what, 'Wrong callback'))
            }
          },
          cleanupCalled = false,
          r;

      assert.strictEqual(r = utils.readInt(new Buffer([]), 0, stream, callback),
                         false,
                         makeMsg(what, 'Wrong result: ' + r));
      assert(cleanupCalled, makeMsg(what, 'Cleanup not called'));
      next();
    },
    what: 'readInt - with stream callback'
  },
  { run: function() {
      var what = this.what,
          r;

      assert.strictEqual(r = utils.readString(new Buffer([0,0,0]), 0),
                         false,
                         makeMsg(what, 'Wrong result: ' + r));
      next();
    },
    what: 'readString - without stream callback - bad length #1'
  },
  { run: function() {
      var what = this.what,
          r;

      assert.strictEqual(r = utils.readString(new Buffer([]), 0),
                         false,
                         makeMsg(what, 'Wrong result: ' + r));
      next();
    },
    what: 'readString - without stream callback - bad length #2'
  },
  { run: function() {
      var what = this.what,
          r;

      assert.deepEqual(r = utils.readString(new Buffer([0,0,0,1,5]), 0),
                       new Buffer([5]),
                       makeMsg(what, 'Wrong result: ' + r));
      next();
    },
    what: 'readString - without stream callback - success'
  },
  { run: function() {
      var what = this.what,
          r;

      assert.deepEqual(r = utils.readString(new Buffer([0,0,0,1,33]), 0, 'ascii'),
                       '!',
                       makeMsg(what, 'Wrong result: ' + r));
      next();
    },
    what: 'readString - without stream callback - encoding'
  },
  { run: function() {
      var what = this.what,
          callback = function() {},
          stream = {
            _cleanup: function(cb) {
              cleanupCalled = true;
              assert(cb === callback, makeMsg(what, 'Wrong callback'))
            }
          },
          cleanupCalled = false,
          r;

      assert.deepEqual(r = utils.readString(new Buffer([0,0,0,1]),
                                            0,
                                            stream,
                                            callback),
                       false,
                       makeMsg(what, 'Wrong result: ' + r));
      assert(cleanupCalled, makeMsg(what, 'Cleanup not called'));
      next();
    },
    what: 'readString - with stream callback - no encoding'
  },
  { run: function() {
      var what = this.what,
          callback = function() {},
          stream = {
            _cleanup: function(cb) {
              cleanupCalled = true;
              assert(cb === callback, makeMsg(what, 'Wrong callback'))
            }
          },
          cleanupCalled = false,
          r;

      assert.deepEqual(r = utils.readString(new Buffer([0,0,0,1]),
                                            0,
                                            'ascii',
                                            stream,
                                            callback),
                       false,
                       makeMsg(what, 'Wrong result: ' + r));
      assert(cleanupCalled, makeMsg(what, 'Cleanup not called'));
      next();
    },
    what: 'readString - with stream callback - encoding'
  },
  { run: function() {
      var what = this.what,
          filepath = fixturesdir + '/encrypted-rsa.ppk',
          passphrase = 'node.js',
          keyInfo = utils.parseKey(fs.readFileSync(filepath));

      utils.decryptKey(keyInfo, passphrase);

      var expPrivOrig = new Buffer([
        45,45,45,45,45,66,69,71,73,78,32,82,83,65,32,80,82,73,86,65,84,69,32,75,
        69,89,45,45,45,45,45,10,77,73,73,67,87,81,73,66,65,65,75,66,103,71,115,
        70,89,82,77,66,85,68,73,109,97,52,48,98,110,101,80,66,77,48,79,86,115,
        104,119,102,109,87,115,83,57,122,72,113,88,72,108,115,122,111,81,113,68,
        82,101,89,52,103,102,51,10,112,87,112,83,78,76,116,53,70,70,78,77,80,50,
        87,107,69,68,121,70,105,71,83,115,54,77,55,72,51,102,56,108,89,72,43,108,
        120,85,51,122,56,72,99,78,103,101,121,70,80,48,52,70,98,85,77,75,83,115,
        51,67,54,51,97,108,10,115,110,97,104,107,52,71,75,117,71,69,67,118,55,71,
        112,89,87,118,102,110,110,85,87,112,118,78,111,73,104,101,107,52,113,53,
        117,118,103,82,119,106,65,75,75,107,71,88,111,47,69,116,82,74,56,101,68,
        65,103,69,108,65,111,71,65,10,85,43,71,102,72,76,118,88,69,111,122,81,49,
        109,72,65,56,77,102,99,69,109,67,83,104,76,55,83,77,86,81,78,50,119,80,
        76,56,72,102,103,73,109,89,108,55,43,97,72,112,87,69,56,100,101,49,110,
        109,100,116,119,121,54,112,50,10,52,80,89,50,80,85,89,81,57,80,89,53,55,
        105,51,122,76,56,78,90,100,56,87,81,55,82,103,48,82,66,72,68,108,110,100,
        97,70,101,70,52,69,102,48,117,76,98,111,113,89,100,47,120,78,48,114,122,
        102,121,53,53,122,55,104,87,10,79,76,43,56,86,104,111,120,84,114,66,85,
        118,118,101,79,104,90,119,66,80,107,79,101,72,102,120,109,107,86,122,51,
        120,98,98,114,103,51,107,78,108,111,48,67,81,81,68,74,89,80,75,116,67,
        115,47,108,52,54,75,74,109,78,51,108,10,85,65,78,100,73,52,81,73,117,87,
        81,43,90,108,108,122,55,112,57,52,70,102,100,111,116,110,107,118,113,71,
        43,43,66,112,49,119,79,113,74,83,67,105,104,54,85,86,105,119,76,102,118,
        112,78,90,116,71,77,67,116,107,52,54,87,78,10,104,99,48,122,65,107,69,65,
        105,65,121,78,52,87,85,115,47,48,120,52,87,111,118,71,57,53,54,74,49,65,
        43,117,83,69,75,101,87,122,117,113,102,112,71,71,98,87,103,90,57,88,102,
        110,80,110,107,43,49,65,108,56,70,79,87,49,10,116,117,57,87,87,114,77,80,
        73,97,118,81,110,90,87,47,100,88,120,104,107,101,78,87,84,72,55,56,99,81,
        74,66,65,76,107,77,43,113,122,90,103,77,86,112,90,79,48,107,115,68,113,
        65,52,72,56,90,116,53,108,81,97,102,81,109,10,115,120,67,87,70,102,43,
        108,101,53,67,110,114,97,70,113,87,78,103,104,119,82,115,70,99,112,67,84,
        116,110,52,56,54,98,97,109,121,56,57,104,115,85,100,113,105,76,50,83,54,
        121,103,97,70,111,69,67,81,70,68,107,51,114,49,101,10,119,77,56,109,106,
        77,65,51,98,50,76,77,43,65,71,77,121,72,51,43,71,80,102,53,57,113,119,
        102,76,86,88,80,77,103,101,84,90,117,98,103,84,116,55,119,52,102,54,87,
        98,65,118,111,81,83,56,67,114,119,48,97,68,86,98,72,10,118,102,76,85,86,
        98,67,119,114,57,112,49,66,77,48,67,81,70,83,66,106,67,97,47,102,122,101,
        73,67,86,107,80,70,66,97,75,81,85,109,88,106,81,51,73,99,80,84,79,114,57,
        48,109,83,65,105,80,110,65,65,112,112,83,119,84,10,106,53,83,89,83,102,
        69,57,114,83,86,98,43,69,104,81,48,104,107,50,86,75,87,73,102,111,99,78,
        72,66,68,49,77,65,78,57,122,98,52,61,10,45,45,45,45,45,69,78,68,32,82,83,
        65,32,80,82,73,86,65,84,69,32,75,69,89,45,45,45,45,45
      ]);
      assert(keyInfo.ppk === true, makeMsg(what, 'Expected PPK flag'));
      assert(keyInfo._converted === true,
             makeMsg(what, 'Expected automatic private PEM generation'));
      assert(keyInfo._macresult === true,
             makeMsg(what, 'Expected successful MAC verification'));
      assert(keyInfo._decrypted === true,
             makeMsg(what, 'Expected decrypted flag'));
      assert.deepEqual(keyInfo.privateOrig,
                       expPrivOrig,
                       makeMsg(what, 'Decrypted private PEM data mismatch'));
      next();
    },
    what: 'decryptKey - with encrypted RSA PPK'
  },
  { run: function() {
      var what = this.what,
          filepath = fixturesdir + '/encrypted-dsa.ppk',
          passphrase = 'node.js',
          keyInfo = utils.parseKey(fs.readFileSync(filepath));

      utils.decryptKey(keyInfo, passphrase);

      var expPrivOrig = new Buffer([
        45,45,45,45,45,66,69,71,73,78,32,68,83,65,32,80,82,73,86,65,84,69,32,75,
        69,89,45,45,45,45,45,10,77,73,73,66,117,103,73,66,65,65,75,66,103,81,67,
        90,57,105,80,71,72,110,48,97,78,119,98,66,72,111,112,48,76,102,67,107,
        79,72,66,77,103,75,119,76,79,50,80,49,117,57,57,54,69,85,109,68,105,77,
        49,104,100,83,98,116,10,100,117,77,114,67,113,53,111,78,113,74,76,47,116
        ,79,81,109,72,73,49,100,50,75,101,65,77,48,72,113,74,109,65,74,89,74,103,
        102,43,56,81,104,74,49,109,104,74,56,81,115,65,77,90,113,54,121,84,74,
        106,54,53,77,68,89,120,10,122,105,73,117,56,106,79,85,68,104,80,100,67,
        68,80,48,80,105,67,81,79,66,68,119,88,48,109,47,108,54,47,72,50,73,97,54,
        101,100,121,106,82,49,85,112,51,78,105,112,68,113,113,97,78,104,98,67,73,
        119,73,86,65,76,103,50,10,85,47,110,81,97,114,74,83,113,114,89,72,122,90,
        87,72,47,68,109,80,100,80,80,66,65,111,71,65,72,107,104,113,74,118,83,
        121,122,88,99,51,77,65,104,53,120,110,56,83,106,90,120,77,57,43,101,83,
        105,69,119,65,48,56,89,105,10,75,81,98,53,48,70,118,110,103,120,56,69,76,
        121,77,79,108,100,106,110,79,57,50,121,103,114,117,87,89,113,50,90,105,
        68,70,117,99,79,105,111,48,70,99,74,76,107,65,97,66,102,83,113,75,118,57,
        114,117,108,88,110,114,55,83,47,10,97,81,43,107,119,99,48,105,122,70,99,
        79,97,86,100,122,53,104,79,80,119,118,51,105,52,109,108,77,87,83,121,66,
        51,87,56,54,97,106,53,65,76,119,70,65,97,49,121,112,73,57,73,111,56,51,
        68,99,119,113,100,88,55,104,102,66,10,57,75,98,48,102,77,107,67,103,89,
        65,109,118,86,43,107,113,87,104,85,103,68,89,119,78,78,122,49,113,68,97,
        111,83,56,88,100,115,79,112,111,110,117,116,90,47,48,115,116,82,81,54,54,
        109,75,65,121,56,107,78,86,78,78,81,54,10,111,85,120,49,88,70,108,49,87,
        85,116,52,105,121,70,89,47,50,82,122,50,102,90,104,76,122,53,47,84,98,90,
        82,75,53,121,103,111,54,54,54,87,103,110,120,66,47,85,100,52,71,65,120,
        47,66,80,81,84,103,104,79,74,74,79,76,10,48,48,118,74,107,43,56,106,86,
        67,71,78,68,99,57,52,50,86,54,110,70,88,122,110,68,77,88,119,113,120,104,
        82,67,87,54,100,109,43,50,108,84,104,55,110,116,114,108,105,56,109,67,
        107,53,103,73,85,67,74,90,75,65,77,65,122,10,107,121,114,50,118,108,50,
        80,101,52,56,97,100,105,56,86,115,57,115,61,10,45,45,45,45,45,69,78,68,
        32,68,83,65,32,80,82,73,86,65,84,69,32,75,69,89,45,45,45,45,45,
      ]);
      assert(keyInfo.ppk === true, makeMsg(what, 'Expected PPK flag'));
      assert(keyInfo._converted === true,
             makeMsg(what, 'Expected automatic private PEM generation'));
      assert(keyInfo._macresult === true,
             makeMsg(what, 'Expected successful MAC verification'));
      assert(keyInfo._decrypted === true,
             makeMsg(what, 'Expected decrypted flag'));
      assert.deepEqual(keyInfo.privateOrig,
                       expPrivOrig,
                       makeMsg(what, 'Decrypted private PEM data mismatch'));
      next();
    },
    what: 'decryptKey - with encrypted DSA PPK'
  },
];

function next() {
  if (Array.isArray(process._events.exit))
    process._events.exit = process._events.exit[1];
  if (++t === tests.length)
    return;

  var v = tests[t];
  v.run.call(v);
}

function makeMsg(what, msg) {
  return '[' + group + what + ']: ' + msg;
}

process.once('exit', function() {
  assert(t === tests.length,
         makeMsg('_exit',
                 'Only finished ' + t + '/' + tests.length + ' tests'));
});

next();
