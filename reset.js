/* Copyright (c) 2016 timugz (timugz@gmail.com) */
'use strict'

module.exports = function (lab, si, user1Data, user2Data) {
  var _ = require('lodash')
  var Code = require('code')
  var suite = lab.suite
  var test = lab.test
  var before = lab.before
  var expect = Code.expect

  user1Data = _.extend({}, {
    nick: 'nick1',
    email: 'nick1@example.com',
    password: 'test1test',
    active: true
  }, user1Data)

  user2Data = _.extend({}, {
    nick: 'nick2',
    email: 'nick2@example.com',
    password: 'test2test',
    active: true
  }, user2Data)

  suite('seneca-user reset suite tests ', function () {
    before({}, function (done) {
      si.ready(function (err) {
        if (err) return process.exit(!console.error(err))
        done()
      })
    })

    test('user/register test', function (done) {
      si.act(_.extend({role: 'user', cmd: 'register'}, user1Data), function (err, data) {
        expect(err).to.not.exist()
        expect(data.user.nick).to.equal(user1Data.nick)
        done(err)
      })
    })

    test('user/register test', function (done) {
      si.act(_.extend({role: 'user', cmd: 'register'}, user2Data), function (err, data) {
        expect(err).to.not.exist()
        expect(data.user.nick).to.equal(user2Data.nick)
        done(err)
      })
    })

    var resetId
    test('user/create_reset unknown user test', function (done) {
      si.act({ role: 'user', cmd: 'create_reset', nick: user1Data.nick }, function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.be.true()
        expect(data.reset.id).to.exist()
        resetId = data.reset.token
        done(err)
      })
    })

    test('user/create_reset unknown user test', function (done) {
      si.act({ role: 'user', cmd: 'execute_reset', token: resetId, password: 'x', repeat: 'x' }, function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.be.true()
        done(err)
      })
    })

    test('user/login user test', function (done) {
      si.act({role: 'user', cmd: 'login', nick: user1Data.nick, password: 'x'}, function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.be.true()
        expect(data.user).to.exist()
        done(err)
      })
    })
  })
}
