const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const cartSchema = mongoose.Schema({
    item_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }

});

module.exports = mongoose.model("Cart",cartSchema);