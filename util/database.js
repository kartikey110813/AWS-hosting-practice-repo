const Sequelize = require('sequelize')
const dotenv = require('dotenv');

dotenv.config({
    path: '../.env'
})
const sequelize = new Sequelize(
   'lms',
    'admin',
    'Helloworld',
    {
        dialect: 'mysql',
        host : 'lms.co8hcriaiaco.us-west-2.rds.amazonaws.com'
    }
);

module.exports = sequelize
