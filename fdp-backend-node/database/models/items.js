const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({

    item_name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    img_url: {
        type: String,
        //required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});

module.exports = mongoose.model('items', itemSchema);