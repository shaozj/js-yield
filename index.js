/*
* implement yield with javascript
*/

function yield(value, rest) {
  return {
    value: value,
    _rest: rest,
    next: yield._next
  };
}

yield._next = function () {
  if (this._rest) {
    return this._rest();
  } else {
    return null;
  }
} 

function numSeq(n) {
  return yield(n, function () {
    return yieldSeq(numSeq(n + 1));
  })
}

function yieldSeq(iter, rest) {
  if (!rest) return iter;
  if (!iter) return rest();

  return {
    value: iter.value,
    _iter: iter,
    _rest: rest,
    next: yieldSeq._next
  };
}

yieldSeq._next = function () {
  return yieldSeq(this._iter.next(), this._rest);
}


