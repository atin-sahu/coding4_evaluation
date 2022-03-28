const express = require("express");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

const todo = require("../models/todo_model");
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, async(req,res)=>{
    try {
        const todo = await todo.find().lean().exec();
        return res.status(200).send(todo);
    } catch (err) {
        return res.status(400).send({mes:err.message})
    }
})

router.post("/", authenticate, async(req,res)=>{
    req.body.user_id = req.user._id;
    try {
        const todo = await todo.create(req.body);
        return res.status(200).send(todo);
    } catch (err) {
        return res.status(400).send({mes:err.message})
    }
})

module.exports = router;