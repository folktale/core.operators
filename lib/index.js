// Copyright (c) 2014 Quildreen Motta
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/**
 * Provides JS operators as curried functions.
 *
 * @module lib/index
 */

// -- Dependencies -----------------------------------------------------
var curry = require('core.lambda').curry
var flip  = require('core.lambda').flip


// -- Aliases ----------------------------------------------------------
var internalToString = Function.call.bind(Object.prototype.toString)

// -- Helpers ----------------------------------------------------------

/*
 * Tests if something is an object
 *
 * @summary α → Boolean
 */
function isObject(a) {
  return Object(a) === a
}


// -- Arithmetic -------------------------------------------------------

/**
 * Addition.
 *
 * @example
 *   add(2)(3)          // => 2 + 3 => 5
 *
 * @method
 * @summary Number → Number → Number
 */
exports.add = curry(2, add)
function add(a, b) {
  return a + b
}

/**
 * Subtraction.
 *
 * @example
 *   subtract(2)(3)     // => 2 - 3 => -1
 *
 * @method
 * @summary Number → Number → Number
 */
exports.subtract = curry(2, subtract)
function subtract(a, b) {
  return a - b
}

/**
 * Division.
 *
 * @example
 *   divide(4)(2)       // => 4 / 2 => 2
 *
 * @method
 * @summary Number → Number → Number
 */
exports.divide = curry(2, divide)
function divide(a, b) {
  return a / b
}

/**
 * Multiplication.
 *
 * @example
 *   multiply(2)(3)     // => 2 * 3 => 6
 *
 * @method
 * @summary Number → Number → Number
 */
exports.multiply = curry(2, multiply)
function multiply(a, b) {
  return a * b
}

/**
 * Modulus.
 *
 * @example
 *   modulus(3)(2)      // => 3 % 2 => 1
 *
 * @method
 * @summary Number → Number → Number
 */
exports.modulus = curry(2, modulus)
function modulus(a, b) {
  return a % b
}

/**
 * Negation.
 *
 * @example
 *   negate(1)          // => -1
 *
 * @method
 * @summary Number → Number
 */
exports.negate = negate
function negate(a) {
  return -a
}

/**
 * Increment.
 *
 * @example
 *   increment(1)       // => 2
 *
 * @method
 * @summary Number → Number
 */
exports.increment = exports.add(1)

/**
 * Decrement.
 *
 * @example
 *   decrement(2)       // => 1
 *
 * @method
 * @summary Number → Number
 */
exports.decrement = flip(exports.subtract)(1)




// -- Logical ----------------------------------------------------------

/**
 * Logical negation.
 *
 * @example
 *   not(false)         // => !false => true
 *
 * @method
 * @summary Boolean → Boolean
 */
exports.not = not
function not(a) {
  return !a
}

/**
 * Logical conjunction.
 *
 * @example
 *   and(true, false)           // => true && false => false
 *   and(true, true)            // => true && true => true
 *
 * @method
 * @summary Boolean → Boolean → Boolean
 */
exports.and = curry(2, and)
function and(a, b) {
  return a && b
}

/**
 * Logical disjunction.
 *
 * @example
 *   or(true, false)            // => true || false => true
 *   or(false, false)           // => false || false => false
 *
 * @method
 * @summary Boolean → Boolean → Boolean
 */
exports.or = curry(2, or)
function or(a, b) {
  return a || b
}


// -- Bitwise ----------------------------------------------------------

/**
 * Bitwise negation.
 *
 * @example
 *   bitNot(0b110)      // => ~0b110 => -0b111
 *
 * @method
 * @summary Int → Int
 */
exports.bitNot = bitNot
function bitNot(a) {
  return ~a
}

/**
 * Bitwise conjunction.
 *
 * @example
 *   bitAnd(0b110, 0b101)       // => 0b110 & 0b101 => 0b100
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitAnd = curry(2, bitAnd)
function bitAnd(a, b) {
  return a & b
}

/**
 * Bitwise disjunction.
 *
 * @example
 *   bitOr(0b110, 0b101)        // => 0b110 | 0b101 => 0b111
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitOr = curry(2, bitOr)
function bitOr(a, b) {
  return a | b
}

/**
 * Bitwise exclusive disjunction.
 *
 * @example
 *   bitXor(0b1000, 0b0110)     // => 0b1000 ^ 0b0110 => 0b1110
 *   bitXor(0b110, 0b101)       // => 0b110 ^ 0b101 => 0b011
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitXor = curry(2, bitXor)
function bitXor(a, b) {
  return a ^ b
}

/**
 * Bitwise left shift.
 *
 * @example
 *   bitShiftLeft(0b10, 2)    // => 0b10 << 2   => 0b1000
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitShiftLeft = curry(2, bitShiftLeft)
function bitShiftLeft(a, b) {
  return a << b
}

/**
 * Sign-propagating bitwise right shift.
 *
 * @example
 *   bitShiftRight(0b1000, 2)   // => 0b1000 >> 2    => 0b10
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitShiftRight = curry(2, bitShiftRight)
function bitShiftRight(a, b) {
  return a >> b
}

/**
 * Zero-fill bitwise right shift.
 *
 * @example
 *   bitUnsignedShiftRight(-0b1001, 2)  // => -0b1001 >>> 2     => 0b111111111111111111111111111101
 *
 * @method
 * @summary Int → Int → Int
 */
exports.bitUnsignedShiftRight = curry(2, bitUnsignedShiftRight)
function bitUnsignedShiftRight(a, b) {
  return a >>> b
}


// -- Relational -------------------------------------------------------

/**
 * Strict equality.
 *
 * @example
 *   equal(1, '1')     // => 1 === '1' => false
 *   equal(1, 1)       // => 1 === 1   => true
 *
 * @method
 * @summary α → α → Boolean
 */
exports.equal = curry(2, equal)
function equal(a, b) {
  return a === b
}

/**
 * Strict inequality.
 *
 * @example
 *   notEqual(1, '1')  // => 1 !== '1' => true
 *   notEqual(1, 1)    // => 1 !== 1   => false
 *
 * @method
 * @summary α → α → Boolean
 */
exports.notEqual = curry(2, notEqual)
function notEqual(a, b) {
  return a !== b
}

/**
 * Greater than.
 *
 * @example
 *   greaterThan(2, 3)  // => 2 > 3 => false
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.greaterThan = curry(2, greaterThan)
function greaterThan(a, b) {
  return a > b
}

/**
 * Greater or equal to.
 *
 * @example
 *   greaterOrEqualTo(2, 2)     // => 2 >= 2 => true
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.greaterOrEqualTo = curry(2, greaterOrEqualTo)
function greaterOrEqualTo(a, b) {
  return a >= b
}

/**
 * Less than.
 *
 * @example
 *   lessThan(2, 3)             // => 2 < 3 => true
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.lessThan = curry(2, lessThan)
function lessThan(a, b) {
  return a < b
}

/**
 * Less or equal to.
 *
 * @example
 *   lessOrEqualTo(2, 3)        // => 2 <= 3 => true
 *
 * @method
 * @summary Number → Number → Boolean
 */
exports.lessOrEqualTo = curry(2, lessOrEqualTo)
function lessOrEqualTo(a, b) {
  return a <= b
}


// -- Special ----------------------------------------------------------

/**
 * Property accessor.
 *
 * @example
 *   get('foo', { foo: 1 })     // => ({ foo: 1 })['foo'] => 1
 *
 * @method
 * @summary String → Object → α | Void
 */
exports.get = curry(2, get)
function get(key, object) {
  return object[key]
}

/**
 * Tests the existence of a property in an object.
 *
 * @example
 *   has('foo', { foo: 1 })  // => 'foo' in { foo: 1 } => true
 *
 * @method
 * @summary String → Object → Boolean
 */
exports.has = curry(2, has)
function has(key, object) {
  return key in object
}

/**
 * Instance check.
 *
 * @example
 *   isInstance(Array, [1])     // => [1] instanceof Array => true
 *
 * @method
 * @summary Function → Object → Boolean
 */
exports.isInstance = curry(2, isInstance)
function isInstance(constructor, a) {
  return a instanceof constructor
}

/**
 * Constructs new objects.
 *
 * @example
 *   create(Array, 'foo')       // => new Array('foo')  => ['foo']
 *
 * @method
 * @summary (new(α₁, α₂, ..., αₙ) → β) → (α₁, α₂, ..., αₙ) → β
 */
exports.create = create
function create(constructor) {
  return function() {
           var a = Object.create(constructor.prototype)
           var b = constructor.apply(a, arguments)
           return isObject(b)?     b
           :      /* otherwise */  a }
}

/**
 * Returns the internal type of the object.
 *
 * @example
 *   typeOf('foo')        // => typeof 'foo' => 'string'
 *
 * @method
 * @summary α → String
 */
exports.typeOf = typeOf
function typeOf(a) {
  return typeof a
}

/**
 * Returns the internal `[[Class]]` of the object.
 *
 * @example
 *   classOf('foo')     // => {}.toString.call('foo') => 'String'
 *
 * @method
 * @summary α → String
 */
exports.classOf = classOf
function classOf(a) {
  return a === undefined?  'Undefined'
  :      a === null?       'Null'
  :      /* otherwise */   internalToString(a).slice(8, -1)
}
