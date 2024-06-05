// config.js
const mongoose = require('mongoose');

function connectDB() {
    
    return mongoose.connect(`mongodb+srv://namanmadhav0:Naman123@cluster0.wtlqnno.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('db connected');
    })
    .catch((error) => {
        console.log("db not connected:", error);    
    });
}

module.exports = connectDB;
