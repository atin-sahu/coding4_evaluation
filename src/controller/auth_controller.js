const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const generatetoken = (user)=>{
    return jwt.sign({user}, process.env.SECRET_KEY)
}

const register = async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).send({message:"email already exist"});
        }

        user = await User.create(req.body);

        const token = generatetoken(user)
        return res.status(200).send({user,token});
    } catch (err) {
        res.status(400).send({message:err.message});
    }
}


const login = async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send({message:"wrong email or password"});
        }

        const match = user.checkpassword(req.body.password)

        if(!match){
            return res.status(400).send({message:"wrong email or password"});
        }

        const token = generatetoken(user)
        return res.status(200).send({user,token});
    } catch (err) {
        res.status(400).send({message:err.message});
    }
}


module.exports = {register, login, generatetoken}