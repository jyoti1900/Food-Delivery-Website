const OrdersModel = require("../database/models/orders");
const OrderItemsModel = require("../database/models/order-items");
const CartModel = require("../database/models/cart");

const mongoose = require("mongoose");
const moment = require("moment");

exports.placeOrder = async (req, res) => {
    try {
        const { items } = req.body;
        let totalInclTax = 0;
        let totalExclTax = 0;
        for (let i = 0; i < items.length; i++) {
            // calculate total
            totalExclTax = totalExclTax + items[i].price * items[i].quantity;
        }
        totalInclTax = totalExclTax + (totalExclTax * 12) / 100;
        const orderData = {
            user_id: req.userDetails.data._id,
            address_id: req.body.address_id,
            gst: 12,
            total_excl_tax: totalExclTax.toFixed(2),
            total_incl_tax: totalInclTax.toFixed(2),
            delivery_fees: totalInclTax < 500 ? 40 : 0,
            delivery_time: req.body.delivery_time,
        };
        const createdOrder = await OrdersModel.create(orderData);
        let orderItemData = [];
        for (let i = 0; i < items.length; i++) {
            orderItemData.push({
                order_id: createdOrder._id,
                item_id: items[i].item_id,
                item_name: items[i].item_name,
                price: items[i].price,
                quantity: items[i].quantity,
            });
        }
        await OrderItemsModel.insertMany(orderItemData);
        // await OrdersModel.create({
        //     user_id: req.userDetails.data._id,
        //     address_id: req.body.address_id,

        // });
        await CartModel.deleteMany({ user_id: req.userDetails.data._id });

        res.json({
            success: true,
            data: createdOrder,
            message: "Order placed successfully",
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

exports.previewOrder = async (req, res) => {
    try {
        const { items } = req.body;
        let totalInclTax = 0;
        let totalExclTax = 0;
        for (let i = 0; i < items.length; i++) {
            // calculate total
            totalExclTax = totalExclTax + items[i].price * items[i].quantity;
        }
        totalInclTax = totalExclTax + (totalExclTax * 12) / 100;
        const deliveryFees = 40;
        const deliveryFeesDiscount = totalExclTax >= 500 ? 40 : 0;
        res.json({
            success: true,
            data: {
                total_items: items.length,
                total_excl_tax: totalExclTax,
                total_incl_tax: totalInclTax,
                gst: (totalExclTax * 12) / 100 + " (12%)",
                delivery_fees: deliveryFees,
                delivery_fees_discount: deliveryFeesDiscount,
                net_payable: totalInclTax + deliveryFees - deliveryFeesDiscount,
            },
            message: "Order placed successfully",
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

exports.listOrders = async (req, res) => {
    try {
        let { page, perPage } = req.query; // object destructuring
        page = parseInt(page);
        perPage = parseInt(perPage);

        let orders = await OrdersModel.aggregate([
            {
                $match: {
                    user_id: mongoose.Types.ObjectId(req.userDetails.data._id),
                },
            },
            {
                $lookup: {
                    from: "order_items",
                    localField: "_id",
                    foreignField: "order_id",
                    as: "items",
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
        ]);
        orders = orders.map((order) => {
            order.createdAt = moment(order.createdAt).format("DD MMM YYYY, HH:mm A");
            return order;
        })

        res.json({
            success: true,
            message: "Order list fetched successfully",
            data: orders
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
