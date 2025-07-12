const CartModel = require("../database/models/cart");
const mongoose = require("mongoose");

exports.addToCart = async (req, res) => {
    try {
        const itemExists = await CartModel.findOne({
            item_id: req.body.itemId,
            user_id: req.userDetails.data._id,
        });
        if (itemExists) {
            await CartModel.findByIdAndUpdate(itemExists._id, {
                $inc: { quantity: 1 },
            });
        } else {
            await CartModel.create({
                item_id: req.body.itemId,
                user_id: req.userDetails.data._id,
            });
        }
        res.json({
            success: true,
            message: "Item added to cart",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err,
        });
    }
};

exports.listCart = async (req, res) => {
    try {
        const data = await CartModel.aggregate([
            {
                $match: {
                    user_id: mongoose.Types.ObjectId(req.userDetails.data._id),
                },
            },
            {
                $lookup: {
                    from: "items",
                    localField: "item_id",
                    foreignField: "_id",
                    as: "itemDetails",
                },
            },
            {
                $unwind: {
                    path: "$itemDetails",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $project: {
                    item_id: 1,
                    item_name: "$itemDetails.item_name",
                    price: "$itemDetails.price",
                    quantity: 1,
                    total: {
                        $multiply: ["$itemDetails.price", "$quantity"],
                    },
                },
            },
        ]);
        res.json({
            success: true,
            message: "Data fetched successfully",
            data: data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err,
        });
    }
};

exports.quantityIncrement = async (req, res) => {
    try {
        const cartId = await CartModel.findByIdAndUpdate(req.params._id, {
            $inc: { quantity: 1 },
        });

        if (cartId) {
            res.json({
                success: true,
                message: "Item increased successfully in the cart",
            });
        } else {
            res.json({
                success: false,
                message:
                    "Quantity cannot be increased further. Maximum quantity reached.",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error, item not increased in the cart",
            error: err,
        });
    }
};

exports.quantityDecrement = async (req, res) => {
    try {
        console.log(req.cart);
        const cartId = await CartModel.findByIdAndUpdate(req.params._id, {
            $inc: { quantity: -1 },
        });
        if (cartId) {
            res.json({
                success: true,
                message: "Item decreased successfully in the cart",
            });
        } else {
            res.json({
                success: false,
                message:
                    "Quantity cannot be decreased further. Minimum quantity reached.",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error, item not decreased from the cart",
            error: err,
        });
    }
};

exports.deleteToCart = async (req, res) => {
    try {
        console.log(req.cart);
        const result = await CartModel.findByIdAndDelete(req.params._id);
        if (result) {
            res.json({
                success: true,
                message: "Item removed from cart",
            });
        } else {
            res.json({
                success: false,
                message: "Item not found from cart",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error, item not deleted from cart",
            error: err,
        });
    }
};
