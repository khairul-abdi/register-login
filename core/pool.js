const util = require('util')
const mysql = require('mysql')

// Connection to the database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'us-cdbr-iron-east-04.cleardb.net',
  user: 'b718451d97f87a',
  password: '54fb84e5',
  database: 'heroku_d94675a72978852'
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
