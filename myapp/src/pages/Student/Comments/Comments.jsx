import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';

const Comments = () => {
  const [text,setText]  = useState("");
 


    const comment = [
      {
        "id": 1,
        "text": "This is the first comment!",
        "upvotes": 5,
        "downvotes": 2,
        "replies": [
          {
            "id": 1,
            "text": "Reply to comment 1",
            "upvotes": 2,
            "downvotes": 1
          }
        ]
      },
      {
        "id": 2,
        "text": "Great idea!",
        "upvotes": 10,
        "downvotes": 1,
        "replies": []
      }
    ]

    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [replyText, setReplyText] = useState('');
    const replyInputRefs = useRef({});
  
    useEffect(() => {
      // setComments(comment);
  
      axios.get('http://localhost:8000/api/comment/comments')
        .then(response => {
          console.log('response::',response);
          setComments(response.data);
        })
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }, []);
  
    const handleAddComment = () => {
     
      axios.post('http://localhost:8000/api/comment/comments', { text: newCommentText })
        .then(response => {
          setComments([...comments, response.data]);
          setNewCommentText('');
        })
        .catch(error => {
          console.error('Error adding comment:', error);
        });
    };
  
    const handleReply = (commentId, replyId) => {
      // setReplyToCommentId(commentId);
      // setReplyToCommentId(replyId ? replyId : commentId);
      setReplyToCommentId(replyId || commentId);
      setReplyText('');
    };
  
    const handleAddReply = () => {
    // Add a reply to a comment to the backend
    axios.post(`http://localhost:8000/api/comment/addreply`, { text: replyText, commentId: replyToCommentId })
      .then(response => {
        const updatedComments = comments.map(comment => {
          if (comment.id === replyToCommentId) {
            return { ...comment, replies: [...comment.replies, response.data] };
          }
          return comment;
        });
        setComments(updatedComments);
        setReplyToCommentId(null);
        setReplyText('');
      })
      .catch(error => {
        console.error('Error adding reply:', error);
      });
  };
  
  
    
  return (
    <div className="bg-slate-300">
      <main className="px-20 py-20 border border-blue-500">
       

        <div>
      <h2>Comment Section</h2>
      <div>
        <input
          type="text"
          placeholder="Add a comment"
          value={newCommentText}
          onChange={e => setNewCommentText(e.target.value)}
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <div>
        
      {comments.map(comment => (
          <div key={comment._id}>
          <div className="flex items-center gap-2"  >
          <p>{comment.text}</p>
            <button onClick={() => handleReply(comment._id)}>Reply</button>
          </div>
            {replyToCommentId === comment._id && (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Reply to this comment"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  ref={el => replyInputRefs.current[comment._id] = el} // Assign ref to the input field
                />
                <button onClick={handleAddReply} >Add Reply</button>
              </div>
            )}
            <div>
              {comment.replies.map(reply => (
                <div key={reply._id} className="flex items-center gap-2">
                  <p>{reply.text}</p>
                      <button onClick={() => handleReply(comment._id, reply._id)}>Rep ly</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
      </main>
    </div>
  );
};

export default Comments;
