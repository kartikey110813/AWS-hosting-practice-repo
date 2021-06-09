const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const parentselect = sequelize.define(
  "parentselect",
  { idstudent: {type: Sequelize.INTEGER, allowNull: false},
    idparents: { type: Sequelize.INTEGER, allowNull: false },
    myName: { type: Sequelize.STRING, allowNull: true },
    selectGrade: { type: Sequelize.STRING, allowNull: false },
    selectGoal: { type: Sequelize.STRING, allowNull: false },
    selectHour: { type: Sequelize.INTEGER, allowNull: false },
    myDate: { type: Sequelize.DATEONLY, allowNull: false },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
)

module.exports = parentselect;
