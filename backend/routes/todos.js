const express = require('express');
const todo = require('../models/TodoDB');
const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await todo.find();
    res.json(todos);
});

router.post('/', async (req, res) => {
    const Addtodo = new todo ({
        name: req.body.name,
        status : req.body.status
    });
   try{
        const savedTodo = await Addtodo.save();
        res.send(savedTodo);
    }catch(err){
        res.json({message: err});
    }

});

router.patch('/:TodoId', async (req, res) => {
    try{
        const updatedTodo = await todo.updateOne(
            {_id: req.params.TodoId},
            {$set: {name : req.body.name, status : req.body.status}}
            );
            res.json(updatedTodo);
        }catch(err){
            res.json({message: err});
            
        }
    });

    module.exports = router;