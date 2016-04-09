/*
* implement yield with javascript
*/

exports.yield = yield = function yield(value, rest) {
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

exports.yieldSeq = yieldSeq = function yieldSeq(iter, rest) {
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





