const express = require("express");
const router = express.Router();
const { addComments, getAllComments, addReply } = require('../controller/commentsController');

router.post("/comments",addComments);

router.get("/comments",getAllComments);

router.post("/addreply", addReply);

// router.post("/upvote", upvoteComment);


module.exports = router;
