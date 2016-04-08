var assert = require('assert');
var yield = require('./index.js').yield;
var yieldSeq = require('./index.js').yieldSeq;


function fibSeq() {
  function fibSeq$(a, b) {
    var next  = a + b;
    return yield(next, function () {
      return yieldSeq(fibSeq$(b, next));
    });
  }

  return yield(0, function () {
    return yield(1, function() {
      return yieldSeq(fibSeq$(0, 1));
    });
  });
}

var sum = 0;

describe('fib sequence', function () {
  it('should return fib sequence', function () {
    for (var iter = fibSeq(); iter; iter = iter.next()) {
      if (iter.value <= 8) {
        sum += iter.value;
      } else {
        break;
      }
    }
    assert.equal(20, sum);
  })
})
