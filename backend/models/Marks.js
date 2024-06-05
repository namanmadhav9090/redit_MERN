// Marks Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marksSchema = new Schema({
    marks : { type: Number }
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
