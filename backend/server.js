require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const connectDB = require('./config/db');
const cors = require('cors');
// const studentRoutes = require('./routes/students');
const commentRoutes = require('./routes/Comments');
  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req, res)=>{
    return res.send("Ok");
})
// Routes
// app.use('/api/student', studentRoutes);
app.use('/api/comment', commentRoutes);

connectDB();


app.listen(port,()=>{
    console.log('server is running successfully on port 8000');
})
