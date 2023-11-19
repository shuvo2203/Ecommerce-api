const jwt = require('jsonwebtoken');
const User = require('../models/userMOdel');


exports.isAuthenticatedUser=async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token){
        res.status(400).json('login to access this token');
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decodedData.id);
    next();
}

exports.authorizeRoles=(...roles)=>{
    return(req, res, next)=>{
        if(roles.includes(req.user.role)){
            res.status(400).json(`${req.user.role} is not allowed to access this request`);
        }
        next();
    }
}