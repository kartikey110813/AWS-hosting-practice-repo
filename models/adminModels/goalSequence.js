const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const JsonField = require('sequelize-json')
const goalSequence = sequelize.define(
  "goalSequence",
  {
    id: { type: Sequelize.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true},
    taskID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gradeID: { type: Sequelize.INTEGER, allowNull: false},
    subject: { type: Sequelize.STRING, allowNull: false },
    taskName: { type: Sequelize.STRING, allowNull: false },
    goalName: { type: Sequelize.STRING, allowNull: false },
    sequence: { type: Sequelize.INTEGER, allowNull: false },
    hour: { type: Sequelize.INTEGER, allowNull: false },
    quesArray:{type:Sequelize.JSON,allowNull:false}
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = goalSequence;
