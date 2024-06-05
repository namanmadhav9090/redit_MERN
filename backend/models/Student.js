const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
      },
      age: {
        type: String,
        required: true
      },
      grade: {
        type: String
      },
      marksId: { type: mongoose.Schema.Types.ObjectId, ref: 'Marks' }
})

const Student = mongoose.model("Student",StudentSchema);

module.exports = Student;