const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const Comment = require("../models/Comments");
const Reply = require("../models/Replys");

module.exports = {
  addComments: async (req, res) => {
    const { text } = req.body;
    try {
      let data = {
        text: text,
        upvotes: 0,
        downvotes: 0,
        replies: [],
      };
      const newComment = await Comment.create(data);
      res.json(newComment);
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllComments: async (req, res) => {
    const data = await Comment.find();
    return res.json(data);
  },

  addReply: async(req, res) => {
    try {
        const { commentId, text } = req.body;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Create a new reply object
        const newReply = {
            text,
            upvotes: 0,
            downvotes: 0
        };

        // Push the new reply to the replies array of the corresponding comment
        comment.replies.push(newReply);

        // Save the updated comment document
        await comment.save();

        res.json(newReply);
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ error: "Internal server error" });
    }
 }
};
