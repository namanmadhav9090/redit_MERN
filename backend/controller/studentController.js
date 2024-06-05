const Student = require("../models/Student");
const Marks = require("../models/Marks");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {
  // done
  createStudent: async (req, res) => {
    try {
      const { username, age, grade, marks } = req.body;

      const schema = Joi.object({
        username: Joi.string().required(),
        age: Joi.string().required(),
        grade: Joi.string().allow(""),
        marks: Joi.number().allow(""),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const existingStudent = await Student.findOne({ username });
      if (existingStudent) {
        return res.status(400).json({ message: "Student already exists" });
      }

      const studentMarks = new Marks({
        marks: marks,
      });
      await studentMarks.save();

      const newStudent = new Student({
        username,
        age,
        grade,
        marksId: studentMarks._id,
      });
      await newStudent.save();

      res
        .status(201)
        .json({ message: "Student created successfully", student: newStudent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getStudents: async (req, res) => {
    try {
      const { id } = req.query;

      if (id) {
        const student = await Student.findById(id).populate("marksId");
        if (!student) {
          return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
      } else {
        const limit = parseInt(req.query.limit) || 2;
        const page = parseInt(req.query.page) || 1;
        const totalCount = await Student.countDocuments();
        const students = await Student.find()
          .skip((page - 1) * limit)
          .limit(limit);
        res.json({ data: students, totalCount: totalCount });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { username, age, grade, marks } = req.body;

      const schema = Joi.object({
        username: Joi.string().required(),
        age: Joi.string().required(),
        grade: Joi.string().allow(""),
        marks: Joi.number().allow(""),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const existingStudent = await Student.findById(id);
      if (!existingStudent) {
        return res.status(404).json({ message: "Student not found" });
      }

      existingStudent.username = username;
      existingStudent.age = age;
      existingStudent.grade = grade;

      // Check if marks are provided and update them
      if (marks !== undefined) {
        // Find the associated marks document
        const existingMarks = await Marks.findById(existingStudent.marksId);
        if (!existingMarks) {
          return res.status(404).json({ message: "Marks not found" });
        }
        // Update marks details
        existingMarks.marks = marks;
        await existingMarks.save();
      }

      await existingStudent.save();

      res.json({
        message: "Student updated successfully",
        student: existingStudent,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      if (student.marksId) {
        await Marks.deleteOne({ _id: student.marksId });
      }
      await Student.deleteOne({ _id: id });

      res.json({
        message: "Student and associated marks deleted successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  
};
