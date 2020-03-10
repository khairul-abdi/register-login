const express = require('express')
const User = require('../core/user')
const router = express.Router()

const user = new User()

// get index page
router.get('/', (req, res, next) => {
  let user = req.session.user
  if (user) {
    res.redirect('/home')
    return
  }
  res.render('index', { title: 'My application' })
})

// Get home page
router.get('/home', (req, res, next) => {
  let user = req.session.user

  if (user) {
    res.render('home', {
      opp: req.session.opp,
      name: user.fullname
    })
    return
  }
  res.redirect('/')
})

// Post login data
router.post('/login', (req, res, next) => {
  user.login(req.body.username, req.body.password, function(result) {
    if (result) {
      req.session.user = result
      req.session.oop = 1

      res.redirect('/home')
    } else {
      res.send('Username/Password incorrect!')
    }
  })
})

// Post register data
router.post('/register', function(req, res, next) {
  const userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password
  }

  user.create(userInput, function(lastId) {
    if (lastId) {
      user.find(lastId, result => {
        req.session.user = result
        req.session.opp = 0
        res.redirect('/home')
      })
    } else {
      console.log('Error creating a new user ...')
    }
  })
})

// Get logout page
router.get('/loggout', (req, res, next) => {
  if (req.session.user) {
    req.session.destroy(() => {
      res.redirect('/')
    })
  }
})

module.exports = router
