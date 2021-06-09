const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const users = sequelize.define('users',{
    idusers: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
  
        allowNull:false,

        primaryKey:true 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: { type: Sequelize.STRING, allowNull:false },
    password: { type: Sequelize.STRING, allowNull:false }
},{
    timestamps: false,
    createdAt: false,
  updatedAt: false,
})

module.exports = users;