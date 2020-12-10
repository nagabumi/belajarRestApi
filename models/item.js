const mongoose = require('mongoose');
const User = require('./user');

const itemSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    nama:{
        type: String
    },
    kategori:{
        type:String
    },
    jumlah:{
        type: Number,
        default: 1
    },
    harga:{
        type: Number
    },
    Date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Item', itemSchema);