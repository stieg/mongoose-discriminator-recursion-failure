"use strict";
const Promise = require('bluebird');
const assert = require('assert');
const mongoose = require('mongoose');

console.log('mongoose version:', mongoose.version);
mongoose.Promise = Promise;

var schema = mongoose.Schema({
  account: {
    type: Object,
  },
  info: {
    ref: 'Bar',
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  }
});

var Model = mongoose.model('Thing', schema);
Model.on('error', function(err) {
  console.log('Hit Model Error ', err.message);
});

var discSchema = mongoose.Schema({
  account: {
    user: {
      ref: 'Foo',
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    }
  }
});

var Disc = Model.discriminator('ThingDisc', discSchema);

function main() {
  const m1 = new Model({
    info: 'AAAAAAAAAAAAAAAAAAAAAAAA',
  });
  const m1Err = m1.validateSync();
  console.log('M1:', m1);
  assert(!m1Err, m1Err);

  const d1 = new Disc({
    account: {
      user: 'AAAAAAAAAAAAAAAAAAAAAAAA',
    },
    info: 'AAAAAAAAAAAAAAAAAAAAAAAA',
  });
  console.log('D1:', d1);
  const d1Err = d1.validateSync();
  assert(!d1Err, d1Err);

  console.log('Success');
};

main();
