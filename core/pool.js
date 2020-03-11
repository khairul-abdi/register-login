const util = require('util')
const mysql = require('mysql')

// Connection to the database
const pool = mysql.createPool({
  connectionLimit: 10,
  HOST: 'us-cdbr-iron-east-04.cleardb.net',
  USER: 'b718451d97f87a',
  PASSWORD: '54fb84e5',
  DB: 'heroku_d94675a72978852'
})

pool.getConnection((err, connection) => {
  if (err) {
    console.log('Something went wrong connecting to the database ...')
  }

  if (connection) {
    connection.release()
    return
  }
})

pool.query = util.promisify(pool.query)

module.exports = pool
