const express = require('express')
const session = require('express-session')
const path = require('path')
const pageRouter = require('./routes/pages')

const app = express()

const port = process.env.PORT || 4000

// for body parser
app.use(express.urlencoded({ extended: false }))

// serve static file
app.use(express.static(path.join(__dirname, 'public')))

// template engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// session
app.use(
  session({
    secret: 'express bcrypt',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 30
    }
  })
)

// routers
app.use('/', pageRouter)

// errors : page not found 404
app.use((req, res, next) => {
  const err = new Error('Page not found')
  err.status = 404
  next(err)
})

// Handling errors
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send(err.message)
})

// setting up the server
app.listen(port, () => console.log(`Server is running on port ${port}`))

module.exports = app
