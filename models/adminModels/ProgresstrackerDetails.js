const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const ProgresstrackerDetails = sequelize.define(
  "ProgresstrackerDetails",
  {
    idstudent: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    goalId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    taskID: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    hour: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    taskName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    taskValue: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    taskDueDate: {
      type: Sequelize.DATEONLY,
    },
    taskStatus: { type: Sequelize.STRING, allowNull: false }
  },
  
  

  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = ProgresstrackerDetails;
