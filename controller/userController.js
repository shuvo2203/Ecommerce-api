const User = require('../models/userMOdel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//register a user
exports.registerUser=async(req, res)=>{
    const{name, email, password} = req.body;
    const user = await User.create({
        name,email,password:await bcrypt.hash(password, 10),
        avatar:{
            public_id:"sample image",
            url:"sample url"
        }
    });
    const token = jwt.sign({id:this._id}, process.env.SECRET_KEY,{
        expiresIn:"5d"
    });
    res.cookie("token",token);
    res.status(201).json({
        success:true,
        user,
        token
    });
}

//login user
exports.loginUser=async(req, res)=>{
    const{email, password} = req.body;
    const userEmail = await User.findOne({email}).select("+password");
    if(!userEmail){
        res.status(400).json('this email is not registered');
    }
    const isMatchPassword = await bcrypt.compare(password, userEmail.password);
    if(!isMatchPassword){
        res.status(400).json('wrong password');
    }
    const token = jwt.sign({id:this._id}, process.env.SECRET_KEY);
    res.cookie("token", token);
    res.status(200).json({
        success:true,
        message:"login success",
        token
    });
}