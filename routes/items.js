const router = require('express').Router();
const cons = require('cons');
const mongoose = require('mongoose');
const Item = require('../models/item');
const User = require('../models/user');

// add item
router.post('/addItem/:userId', async (req,res)=>{
    const item = new Item({
        nama: req.body.nama,
        kategori: req.body.kategori,
        jumlah: req.body.jumlah,
        harga: req.body.harga
    })
    try {
        const savedItem = await item.save(function(err,item){
            if (err) throw err;
            User.update({
                _id : req.params.userId
            },{
                $push:{
                    "items": item._id
                }
            }, function(err, numAffected){
                res.status(200).send(savedItem);
            });
        });

    } catch (error) {
        res.status(400).send({messgae: error})
    }
});

// get all item
router.get('/getAllItem/:userId', async (req,res)=>{
    try {
        const items = await User.findById(req.params.userId).select('_id items').populate('items').exec();
        res.status(200).send(items);
    } catch (error) {
        res.status(400).send({message : error});
    }
});

// get selected item
router.get('/getItem/:itemId', async (req,res)=>{
    try {
        const selectedItem = await Item.findById(req.params.itemId);
        res.status(200).send(selectedItem);
    } catch (error) {
        res.status(400).send({message: error});
    }

});

// update item
router.patch('/updateItem/:itemId', async (req,res)=>{
    try {
        const updatedItem = await Item.update({_id: req.params.itemId},{
            $set: req.body
        });
        res.status(200).send(updatedItem);
    } catch (error) {
        res.status(400).send({message: error});
    }
});

// delete item
router.delete('/deleteItem/:itemId', async (req,res)=>{
    try {
        const deletedItem = await Item.remove({_id: req.params.itemId});
        res.status(200).send(deletedItem);
    } catch (error) {
        res.status(400).send({message: error});
    }
});

module.exports = router;