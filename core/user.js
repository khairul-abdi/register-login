const pool = require('./pool')
const bcrypt = require('bcrypt')

function User() {}
User.prototype = {
  // Find user data by id or username
  find(user = null, callback) {
    // if user = number return field = id, if user = string return field = username
    if (user) {
      var field = Number.isInteger(user) ? 'id' : 'username'
    }

    const sql = `SELECT * FROM users WHERE ${field} = ?`

    pool.query(sql, user, (err, result) => {
      if (err) throw err

      if (result.length) {
        callback(result[0])
      } else {
        callback(null)
      }
    })
  },

  create: function(body, callback) {
    const pwd = body.password
    body.password = bcrypt.hashSync(pwd, 10)

    const bind = []

    for (prop in body) {
      bind.push(body[prop])
    }

    const sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`

    pool.query(sql, bind, (err, result) => {
      if (err) throw err
      callback(result.insertId)
    })
  },

  login: function(username, password, callback) {
    // console.log(username)
    this.find(username, function(user) {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          callback(user)
          return
        }
      }
      callback(null)
    })
  }
}

module.exports = User
