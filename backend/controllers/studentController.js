const { Student, Mark } = require("../models");
const { Op } = require("sequelize");

// create student
exports.createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // checking data
    if (!name || !email || !age) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and date of birth are required",
      });
    }

    // create new
    const student = await Student.create({
      name,
      email,
      age,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: student,
    });
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all students
exports.getAllStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    // find all
    const { count, rows } = await Student.findAndCountAll({
      limit,
      offset,
      order: [["id", "ASC"]],
      attributes: ["id", "name", "email", "age"],
    });

    res.status(200).json({
      success: true,
      data: rows,
      meta: {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get student data by id
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const student = await Student.findByPk(id, {
      include: [
        {
          model: Mark,
          as: "marks",
          attributes: ["id", "subject", "marks"],
        },
      ],
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update student info
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, parentid, marks } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // update student info
    await student.update({
      name,
      email,
      age,
      parentid,
    });

    // update marks if provided
    if (marks && Array.isArray(marks)) {
      // Delete existing marks
      await Mark.destroy({
        where: { studentId: id },
      });

      // add new marks
      const validMarks = marks.filter((mark) => mark.subject && mark.marks);
      if (validMarks.length > 0) {
        const marksData = validMarks.map((mark) => ({
          studentId: id,
          subject: mark.subject,
          marks: mark.marks,
        }));

        await Mark.bulkCreate(marksData);
      }
    }

    // get updated students and marks
    const updatedStudent = await Student.findByPk(id, {
      include: [{ model: Mark, as: "marks" }],
    });

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete student data
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await student.destroy();

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
