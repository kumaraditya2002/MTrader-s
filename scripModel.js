const mongoose = require('mongoose');

const scripSchema = new mongoose.Schema({
    date:{type:String},
    index:{type:String},
    lot:{type:String},
    ratio:{type:String},
    stPrice:{type:Number},
    buy:{type:Number},
    sell:{type:Number},
    price:{type:Number},
})

const model = mongoose.model("scrip",scripSchema);

module.exports = model;