const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const ProgresstrackerTaskDetails = sequelize.define(
  "ProgresstrackerTaskDetails",
  {
    idstudent: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    taskStatusJson: { type: Sequelize.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('value'));
    },
    set: function (value) {
        this.setDataValue('value', JSON.stringify(value));
    },
      allowNull: false  },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

module.exports = ProgresstrackerTaskDetails;
