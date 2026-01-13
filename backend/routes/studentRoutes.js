const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// create a student
router.post("/students", studentController.createStudent);

// get all students
router.get("/students", studentController.getAllStudents);

// get student by id
router.get("/students/:id", studentController.getStudentById);

// update student data
router.put("/students/:id", studentController.updateStudent);

// delete student
router.delete("/students/:id", studentController.deleteStudent);

module.exports = router;
