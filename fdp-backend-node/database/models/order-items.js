const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = mongoose.Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    item_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    item_name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("order_items", orderItemSchema);
