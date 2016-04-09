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

function numSeq(n) {
  return yield(n, function () {
    return yieldSeq(numSeq(n + 1));
  })
}

var resArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var seq = [];

describe('number sequence', function () {
  it('should return number sequence', function () {
    for (var iter = numSeq(0); iter; iter = iter.next()) {
      seq.push(iter.value);
      if (iter.value >= 9) break;
    }
    for (var i = 0; i < 9; i ++) {
      assert.equal(resArr[i], seq[i]);  
    }
  })
})
