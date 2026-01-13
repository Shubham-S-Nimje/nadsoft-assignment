const sequelize = require("../db/config");
const Student = require("./Student");
const Mark = require("./Mark");

// associations
Student.hasMany(Mark, {
  foreignKey: "studentId",
  as: "marks",
  onDelete: "CASCADE",
});

Mark.belongsTo(Student, {
  foreignKey: "studentId",
  as: "student",
});

// sync models for development use only
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log("Database models synchronized");
  } catch (err) {
    console.error("Error synchronizing database:", err);
  }
};

module.exports = {
  sequelize,
  Student,
  Mark,
  syncDatabase,
};
