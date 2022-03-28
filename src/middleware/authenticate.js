require("dotenv").config();
const { decode } = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const jwt = require("jsonwebtoken")

const verifytoken = (token)=>{
    return new Promise ((resolve,rejected)=>{
        jwt.verify(token,process.env.SECRET_KEY, (err,decode)=>{
            if(err) return rejected(err)
            return resolve(decoded)
        })
    })
}

const authenticate = async(req,res,next)=>{

    if(!req.headers.authorization)
    return res.status(400).send({message:"authorization token not find"})
    if(!req.headers.authorization.startwith("Bearer "))
    return res.status(400).send({message:"authorization token not find"})
    const token  = req.headers.authorization.trim().split(" ")[1]
    let decode;
    try {
        decode = await verifytoken(token)
    } catch (err) {
        console.log(err)
        return res.status(400).send({message:"authorization token not find"})
    }

    req.user = decode.user;
    return next()
}

module.exports = authenticate;