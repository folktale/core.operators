core.operators
==============

[![Build Status](https://secure.travis-ci.org/folktale/core.operators.png?branch=master)](https://travis-ci.org/folktale/core.operators)
[![NPM version](https://badge.fury.io/js/core.operators.png)](http://badge.fury.io/js/core.operators)
[![Dependencies Status](https://david-dm.org/folktale/core.operators.png)](https://david-dm.org/folktale/core.operators)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)


Provides JS operators as curried functions.


## Example

```js
var ops = require('core.operators')

[1, 2, 3].reduce(ops.add, 0)                    // => 6
[{ id: 1 }, { id: 2 }].map(ops.get('id'))       // => [1, 2]
```


## Installing

The easiest way is to grab it from NPM. If you're running in a Browser
environment, you can use [Browserify][]

    $ npm install core.operators


### Using with CommonJS

If you're not using NPM, [Download the latest release][release], and require
the `core.operators.umd.js` file:

```js
var operators = require('core.operators')
```


### Using with AMD

[Download the latest release][release], and require the `core.operators.umd.js`
file:

```js
require(['core.operators'], function(operators) {
  ( ... )
})
```


### Using without modules

[Download the latest release][release], and load the `core.operators.umd.js`
file. The properties are exposed in the global `folktale.core.operators` object:

```html
<script src="/path/to/core.operators.umd.js"></script>
```


### Compiling from source

If you want to compile this library from the source, you'll need [Git][],
[Make][], [Node.js][], and run the following commands:

    $ git clone git://github.com/folktale/core.operators.git
    $ cd core.operators
    $ npm install
    $ make bundle
    
This will generate the `dist/core.operators.umd.js` file, which you can load in
any JavaScript environment.

    
## Documentation

You can [read the documentation online][docs] or build it yourself:

    $ git clone git://github.com/folktale/core.operators.git
    $ cd core.operators
    $ npm install
    $ make documentation

Then open the file `docs/index.html` in your browser.


## Platform support

This library assumes an ES5 environment, but can be easily supported in ES3
platforms by the use of shims. Just include [es5-shim][] :)


## Licence

Copyright (c) 2014 Quildreen Motta.

Released under the [MIT licence](https://github.com/folktale/core.operators/blob/master/LICENCE).

<!-- links -->
[Fantasy Land]: https://github.com/fantasyland/fantasy-land
[Browserify]: http://browserify.org/
[Git]: http://git-scm.com/
[Make]: http://www.gnu.org/software/make/
[Node.js]: http://nodejs.org/
[es5-shim]: https://github.com/kriskowal/es5-shim
[docs]: http://folktale.github.io/core.operators
<!-- [release: https://github.com/folktale/core.operators/releases/download/v$VERSION/core.operators-$VERSION.tar.gz] -->
[release]: https://github.com/folktale/core.operators/releases/download/v1.0.0/core.operators-1.0.0.tar.gz
<!-- [/release] -->
