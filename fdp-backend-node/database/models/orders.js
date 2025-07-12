const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    address_id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    gst: {
        type: Number,
        default: 12
    },
    total_excl_tax: {
        type: Number,
        required: true,
    },
    total_incl_tax: {
        type: Number,
        required: true,
    },
    coupon: {
        type: String
    },
    status: {
        type: String,
        default: "processing",
    },
    delivery_fees: {
        type: Number,
        default: 0
    },
    delivery_time: {
        type: Date,
        default: null
    }
}, {timestamps: true});

module.exports = mongoose.model("orders", orderSchema);
