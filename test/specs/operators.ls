# # Specification for the operators.

/** ^
 * Copyright (c) 2014 Quildreen Motta
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation files
 * (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

spec    = (require 'hifive')!
op      = require '../../lib/'
deep-eq = require 'deep-equal'
{for-all, data, sized, label, choice, as-generator} = require 'claire'

{Bool, Num, Str, Int} = data

pick = (xs) -> xs[Math.floor(Math.random! * xs.length)]
Any  = sized (-> 10), data.Any
Map  = (...as) -> sized (-> 10), (data.Object ...as)
List = (...as) -> sized (-> 10), (data.Array ...as)
Ctor = label 'Ctor', as-generator -> pick [Boolean, Number, String, Array, Object]


module.exports = spec 'Operators' (o, spec) ->

  spec ': Arithmetic' (o) ->
    o 'add(a)(b) <=> a + b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.add(a)(b) is a + b
       .as-test!

    o 'subtract(a)(b) <=> a - b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.subtract(a)(b) is a - b
       .as-test!

    o 'divide(a)(b) <=> a / b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.divide(a)(b) is a / b
       .as-test!

    o 'multiply(a)(b) <=> a * b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.multiply(a)(b) is a * b
       .as-test!

    o 'modulus(a)(b) <=> a % b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.modulus(a)(b) is a % b
       .as-test!

    o 'negate(a) <=> -a' do
       for-all(Num).satisfy (a) ->
         op.negate(a) is -a
       .as-test!

    o 'increment(a) <=> a + 1' do
       for-all(Num).satisfy (a) ->
         op.increment(a) is a + 1
       .as-test!

    o 'decrement(a) <=> a - 1' do
       for-all(Num).satisfy (a) ->
         op.decrement(a) is a - 1
       .as-test!

  spec ': Logical' (o) ->
    o 'not(a) <=> !a' do
       for-all(Bool).satisfy (a) ->
         op.not(a) is !a
       .as-test!

    o 'and(a)(b) <=> a && b' do
       for-all(Bool, Bool).satisfy (a, b) ->
         op.and(a)(b) is (a && b)
       .as-test!

    o 'or(a)(b) <=> a || b' do
       for-all(Bool, Bool).satisfy (a, b) ->
         op.or(a)(b) is (a || b)
       .as-test!

  spec ': Bitwise' (o) ->
    o 'bitNot(a) <=> ~a' do
       for-all(Int).satisfy (a) ->
         op.bitNot(a) is ~a
       .as-test!

    o 'bitAnd(a)(b) <=> a & b' do
       for-all(Int, Int).satisfy (a, b) ->
         op.bitAnd(a)(b) is (a .&. b)
       .as-test!

    o 'bitOr(a)(b) <=> a | b' do
       for-all(Int, Int).satisfy (a, b) ->
         op.bitOr(a)(b) is (a .|. b)
       .as-test!

    o 'bitXor(a)(b) <=> a ^ b' do
       for-all(Int, Int).satisfy (a, b) ->
         op.bitXor(a)(b) is (a .^. b)
       .as-test!

    o 'bitShiftLeft(a)(b) <=> a << b' do
       for-all(Int, Int).satisfy (a, b) ->
         op.bitShiftLeft(a)(b) is (a .<<. b)
       .as-test!

    o 'bitShiftRight(a)(b) <=> a >> b' do
       for-all(Int, Int).satisfy (a, b) ->
         op.bitShiftRight(a)(b) is (a .>>. b)
       .as-test!

    o 'bitUnsignedShiftRight(a)(b) <=> a >>> b' do
       for-all(Int, Int).satisfy (a, b) ->
         op.bit-unsigned-shift-right(a)(b) is (a .>>>. b)
       .as-test!

  spec ': Relational' (o) ->
    o 'equal(a)(b) <=> a === b' do
       for-all(Any, Any).satisfy (a, b) ->
         (op.equal(a)(a) is (a is a)) && \
         (op.equal(b)(b) is (b is b)) && \
         (op.equal(a)(b) is (a is b))
       .as-test!

    o 'notEqual(a)(b) <=> a !== b' do
       for-all(Any, Any).satisfy (a, b) ->
         (op.notEqual(a)(a) is (a isnt a)) && \
         (op.notEqual(b)(b) is (b isnt b)) && \
         (op.notEqual(a)(b) is (a isnt b))
       .as-test

    o 'greaterThan(a)(b) <=> a > b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.greaterThan(a)(b) is (a > b)
       .as-test!

    o 'greaterOrEqualTo(a)(b) <=> a >= b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.greaterOrEqualTo(a)(b) is (a >= b)
       .as-test!

    o 'lessThan(a)(b) <=> a < b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.lessThan(a)(b) is (a < b)
       .as-test!

    o 'lessOrEqualTo(a)(b) <=> a <= b' do
       for-all(Num, Num).satisfy (a, b) ->
         op.lessOrEqualTo(a)(b) is (a <= b)
       .as-test!

  spec ': Special' (o) ->
    o 'get(a)(b) <=> b[a]' do
       for-all(Map(Int), List(Str)).satisfy (a, b) ->
         keys = Object.keys(a).concat(b)
         key  = pick keys
         op.get(key)(a) is a[key]
       .as-test!

    o 'has(a)(b) <=> a in b' do
       for-all(Map(Int), List(Str)).satisfy (a, b) ->
         keys = Object.keys(a).concat(b)
         key  = pick keys
         op.has(key)(a) is (key of a)
       .as-test!

    o 'isInstance(a)(b) <=> a instanceof b' do
       for-all(Ctor, Any).satisfy (a, b) ->
         op.isInstance(a)(b) is (b instanceof a)
       .as-test!

    o 'create(a)(...b) <=> new a(...b)' do
       for-all(Any, Any, Any).satisfy (a, b, c) ->
         op.create(Array)(a, b, c) `deep-eq` (new Array(a, b, c))
       .as-test!

    o 'typeOf(a) <=> typeof a' do
       for-all(Any).satisfy (a) ->
         op.typeOf(a) is (typeof a)
       .as-test!

    o 'classOf(a) <=> {}.toString.call(a).slice(8, -1)' do
       for-all(Any).given((isnt null)).satisfy (a) ->
         "[object #{op.classOf(a)}]" is ({}.toString.call(a))
       .as-test!
    
       
         
         
