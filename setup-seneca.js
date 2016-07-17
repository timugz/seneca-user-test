/* Copyright (c) 2016 timugz (timugz@gmail.com) */
'use strict'

var Seneca = require('seneca')

module.exports = function (options) {
  var si = Seneca()

  if (si.version >= '2.0.0') {
    si
      .use(require('seneca-entity'))
  }
  si
    .use(require('seneca-user'), options)

  return si
}
