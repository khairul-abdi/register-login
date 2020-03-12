const util = require('util')
const mysql = require('mysql')

// Connection to the database
const pool = mysql.createPool({
  // connectionLimit: 10,
  HOST: 'xxxcdbr-iron-east-04.cleardb.net',
  USER: 'xxx8451d97f87a',
  PASSWORD: 'xxxb84e5',
  DB: 'xxxoku_d94675a72978852'
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
