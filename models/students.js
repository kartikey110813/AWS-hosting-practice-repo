const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const students = sequelize.define('students',{
    idstudent: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
  
        allowNull:false,

        primaryKey:true 
    },
    usernameStudent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    passwordStudent: { type: Sequelize.STRING, allowNull:false },
    studentFirstName: {type: Sequelize.STRING,allowNull:false},
    studentLastName: {type: Sequelize.STRING,allowNull:false},
    idParents: { type: Sequelize.INTEGER, allowNull:false }
},{
    timestamps: false,
    createdAt: false,
  updatedAt: false,
})

module.exports = students;