const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true,
        min: 6
    },
    email:{
        type: String,
        required: true,
        min: 6
    },
    password:{
        type: String,
        required: true,
        min: 6
    },
    items:[{
        type: Schema.ObjectId,
        ref: 'Item'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);