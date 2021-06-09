const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const uuid = require("uuidv4")
const goal = require("./goal");
const multipleChoiceEnglish = sequelize.define(
  "multipleChoiceEnglish",
  {
    taskId: {
      type: Sequelize.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true
      
    },

    gradeId: { type: Sequelize.INTEGER, allowNull: false },
    goalID: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    goalName: { type: Sequelize.STRING, allowNull: false },
    subject: { type: Sequelize.STRING, allowNull: false },
    taskName: { type: Sequelize.STRING, allowNull: true },
    taskInst: { type: Sequelize.STRING, allowNull: true },
    quesType: { type: Sequelize.STRING, allowNull: true },
    set: { type: Sequelize.INTEGER, allowNull: true },
    quesArray: { type: Sequelize.JSON, allowNull: true },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,

  }
);

multipleChoiceEnglish.removeAttribute('id');

'use strict'
module.exports = multipleChoiceEnglish;
