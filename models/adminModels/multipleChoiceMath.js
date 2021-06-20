const Sequelize = require("sequelize");
const sequelize = require("../../util/database");
const multipleChoiceMath = sequelize.define(
  "multipleChoiceMath",
  { 
    taskId: { type: Sequelize.INTEGER, allowNull: true, primaryKey: true, autoIncrement: true},

    gradeId: { type: Sequelize.INTEGER, allowNull: false },
    goalID: {
      type: Sequelize.INTEGER, allowNull: true,
      
    },
    goalName: { type: Sequelize.STRING, allowNull: false },
    subject: { type: Sequelize.STRING, allowNull: false },
    taskName: { type: Sequelize.STRING, allowNull: true },
    taskInst: { type: Sequelize.STRING, allowNull: true },
    quesType: { type: Sequelize.STRING, allowNull: true },
    set: { type: Sequelize.INTEGER, allowNull: true },
    quesArray: { type: Sequelize.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('value'));
    },
    set: function (value) {
        this.setDataValue('value', JSON.stringify(value));
    },
      allowNull: true },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
    id: false,
  }
);

module.exports = multipleChoiceMath;
