const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Item = require('../models/item');

// penggabungan 2 model dengan populate find(req).populate("item").exec(res)

// Register
router.post('/register', async (req,res)=>{
    const user = new User({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedPost = await user.save();
        res.status(200).send(savedPost);
    } catch (err) {
        res.status(400).send({message: err});
    }
});

// Login
router.post('/login', (req, res)=>{
    res.send('Login')
});


// get all user
router.get('/getAllUser', async (req, res)=>{
    try {
        const users = await User.find().populate('items').exec();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({message : error});
    }
});

module.exports = router;