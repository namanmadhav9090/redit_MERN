    const jwt = require('jsonwebtoken');
    const User = require('../models/User');

    const authUser = async(req, res, next) =>{
        try {
            let token = req.header('Authorization');
            console.log('token::', token);

            if(!token) return res.status(401).json({error:"Unauthorized access"});

            token = token.split("Bearer ")[1];
           jwt.verify(token,
                process.env.JWT_SECRET,
                async(err, decoded) => {
                  if (err) {
                    console.log(err)
                    return res.status(401).json({error:"Unauthorized access"})
                  }
                  req.userid = decoded.id
                  next();
                });
        
        } catch (error) {
            console.log('error::', error);
            res.status(401).json({ message: 'Authentication failed' });
        }
    }

    module.exports = authUser;



 

