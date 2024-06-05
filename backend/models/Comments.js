const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    text: {
        type: String,
        required: true
      },
      upvotes: {
        type: Number,
        required: true
      },
      downvotes: {
        type: Number
      },
      replies: [{
        text: String,
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 }
    }]
});

const Comment = mongoose.model('Comment', commentsSchema);

module.exports = Comment;
