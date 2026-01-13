const { DataTypes } = require("sequelize");
const sequelize = require("../db/config");

const Mark = sequelize.define(
  "Mark",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "student_id",
      references: {
        model: "students",
        key: "id",
      },
    },
    subject: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Marks must be at least 0",
        },
        max: {
          args: [100],
          msg: "Marks cannot exceed 100",
        },
      },
    },
  },
  {
    tableName: "marks",
    timestamps: false,
    underscored: true,
  }
);

module.exports = Mark;
