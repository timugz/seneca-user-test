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
    repeat: 'test1test',
    active: true
  }, user1Data)

  user2Data = _.extend({}, {
    nick: 'nick2',
    email: 'nick2@example.com',
    password: 'test2test',
    repeat: 'test2test',
    active: true
  }, user2Data)

  suite('seneca-user pepper-register-login suite tests ', function () {
    before({}, function (done) {
      si.ready(function (err) {
        if (err) {
          return process.exit(!console.error(err))
        }

        done()
      })
    })

    test('user/register test', function (done) {
      si.act(_.extend({role: 'user', cmd: 'register'}, user1Data), function (err, data) {
        expect(err).to.not.exist()
        expect(data.user.repeat).to.not.exist()
        expect(user1Data.nick, data.nick).to.exist()
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

    test('user/login test', function (done) {
      si.act({role: 'user', cmd: 'login', nick: user1Data.nick, password: user1Data.password}, function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.exist()
        expect(data.why).to.equal('password')
        expect(data.login).to.exist()
        expect(data.user).to.exist()
        expect(data.login.repeat).to.not.exist()
        expect(data.user.repeat).to.not.exist()
        expect(data.login.token).to.exist()
        done(err)
      })
    })

    test('user/register unique nick test', function (done) {
      si.act(_.extend({role: 'user', cmd: 'register'}, user1Data), function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.be.false()
        expect(data.why).to.equal('nick-exists')
        done(err)
      })
    })

    test('user/register password mismatch test', function (done) {
      si.act(_.extend({role: 'user', cmd: 'register'}, {nick: 'npm', password: 'a', repeat: 'b'}), function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.be.false()
        expect(data.why).to.equal('password_mismatch')
        done(err)
      })
    })

    test('user/login invalid user test', function (done) {
      si.act({role: 'user', cmd: 'login', nick: user1Data.nick + 'x', password: user1Data.password}, function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.be.false()
        expect(data.why).to.equal('user-not-found')
        done(err)
      })
    })

    test('user/login invalid password test', function (done) {
      si.act({role: 'user', cmd: 'login', nick: user1Data.nick, password: user1Data.password + 'x'}, function (err, data) {
        expect(err).to.not.exist()
        expect(data.ok).to.be.false()
        expect(data.why).to.equal('invalid-password')
        done(err)
      })
    })
  })
}
