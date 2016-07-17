![Seneca](http://senecajs.org/files/assets/seneca-logo.png)

# seneca-user-test

[![Build Status][travis-badge]][travis-url]
[![Gitter][gitter-badge]][gitter-url]

[![js-standard-style][standard-badge]][standard-style]

## Seneca User-Test Plugin

Standard tests for plugins which extend [seneca-user](https://github.com/senecajs/seneca-user).
It's extracted from [seneca-user](https://github.com/senecajs/seneca-user) repository

## Usage

In test of your custom user plugin

```js
var Lab = require('lab')
var Seneca = require('seneca')
var lab = exports.lab = Lab.script()
var describe = lab.describe
var it = lab.it

describe('inheritance', function () {
    var setupSi = function () {
      var si = Seneca({log: 'silent'})
      if (si.version >= '2.0.0') {
        si.use('entity')
      }

      si
        .use('user')
        .use(require('../YOUR-CUSTOM-USER'))
      return si
    }

    require('seneca-user-test/enable-disable')(lab, setupSi())
    require('seneca-user-test/register-login')(lab, setupSi())
    require('seneca-user-test/pepper-register-login')(lab, setupSi())
    require('seneca-user-test/reset')(lab, setupSi())
    require('seneca-user-test/update-user')(lab, setupSi())

    it('inherits all features of seneca-user', function (done) {
      done()
    })
})

```

Current Version: 1.0.2 (same as [seneca-user](https://github.com/senecajs/seneca-user) plugin)


[Seneca.js]: https://www.npmjs.com/package/seneca
[travis-badge]: https://travis-ci.org/timugz/seneca-user-test.svg
[travis-url]: https://travis-ci.org/timugz/seneca-user-test
[gitter-badge]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/timugz/seneca-plugins
[standard-badge]: https://raw.githubusercontent.com/feross/standard/master/badge.png
[standard-style]: https://github.com/feross/standard