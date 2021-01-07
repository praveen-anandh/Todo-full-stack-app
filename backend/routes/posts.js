const express = require('express');
const Post = require('../models/Post');
const router =  express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

router.post('/', async (req, res) =>{
    console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save();
        res.send(savedPost);
    }catch(err){
        res.json({message: err});
    }

});

router.get('/:postId', async(req, res) => { 
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({ message : err});
    }
})

router.patch('/:postId', async (req, res) => {
try{
    const updatedPOst = await Post.updateOne(
        {_id: req.params.postId},
        {$set: {title : req.body.title}}
        );
        console.log(updatedPOst);
        res.json(updatedPOst);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;