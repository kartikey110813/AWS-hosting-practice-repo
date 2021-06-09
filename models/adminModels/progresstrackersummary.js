const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const progresstrackersummary = sequelize.define(
  "progresstrackersummary",
  {
    idparent: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    idstudent: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    goalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    goalStatus: { type: Sequelize.STRING, allowNull: false },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = progresstrackersummary;
