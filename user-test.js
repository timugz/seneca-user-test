/* Copyright (c) 2016 timugz (timugz@gmail.com) */
'use strict'

var Lab = require('lab')
var lab = exports.lab = Lab.script()

require('./enable-disable')(lab, require('./setup-seneca')())
require('./pepper-register-login')(lab, require('./setup-seneca')({pepper: 'Please generate your own pepper for production'}))
require('./register-login')(lab, require('./setup-seneca')())
require('./reset')(lab, require('./setup-seneca')())
require('./update-user')(lab, require('./setup-seneca')())
