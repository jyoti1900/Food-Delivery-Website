const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({

    cat_name: {
        type: String,
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

module.exports = mongoose.model('categories', categoriesSchema);