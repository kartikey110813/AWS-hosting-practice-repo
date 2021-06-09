require('dotenv').config('./.env')

module.exports = {
  host: process.env.DATABSE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  dialect : process.env.DIALECT,
  port:process.env.PORT
}
