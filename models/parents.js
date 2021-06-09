const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const parents = sequelize.define('parents',{
  
    idparents: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
  
        allowNull:false,

        primaryKey:true 
    },
   
    parentemail: { type: Sequelize.STRING, allowNull:false },
    parentpassword: { type: Sequelize.STRING, allowNull:false },
    parentFirstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    parentLastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Address1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Address2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    State: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    Country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    Zipcode: {
        type: Sequelize.STRING,
        allowNull: false
    }
   
},{
    timestamps: false,
    createdAt: false,
  updatedAt: false,
})

module.exports = parents;