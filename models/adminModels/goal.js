const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const goal = sequelize.define(
  "goal",
  {
    goalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    goalName: { type: Sequelize.STRING, allowNull: false },
    goalDescription: { type: Sequelize.STRING, allowNull: false },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
  }
);

module.exports = goal;
