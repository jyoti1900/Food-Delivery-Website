const fs = require("fs");
const mongoose = require("mongoose");
const ItmModel = require("../database/models/items");
const { writeToS3, getSignedUrl } = require("../utility/s3.service");
var path = require("path");

exports.addItems = async (req, res) => {
    try {
        const fileContent = fs.readFileSync(
            process.cwd() + "/public/uploads/" + req.file.filename
        );
        const s3Response = await writeToS3(
            fileContent,
            path.extname(req.file.filename),
            req.file.filename,
            global.config.s3.BUCKET_NAME,
            global.config.s3.BUCKET_FOLDER
        );

        await ItmModel.create({
            item_name: req.body.itemName,
            price: req.body.price,
            category_id: req.body.catId,
            img_url: s3Response.Key,
        });
        res.json({
            success: true,
            message: "Data inserted successfully",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err,
        });
    } finally {
        try {
            setTimeout(() => {
                fs.unlinkSync(
                    process.cwd() + "/public/uploads/" + req.file.filename
                );
            }, 5000);
        } catch (err) {
            console.log(err);
        }
    }
};

exports.listItems = async (req, res) => {
    try {
        let { page, perPage, catId } = req.query; //object destructuring
        page = parseInt(page);
        perPage = parseInt(perPage);

        // const data = await ItmModel
        //     .find(catId ? { category_id: catId } : {})
        //     .populate("category_id")
        //     .sort({ _id: -1 })
        //     .skip((page - 1) * perPage)
        //     .limit(perPage);
        const data = await ItmModel.aggregate([
            {
                $match: catId
                    ? { category_id: mongoose.Types.ObjectId(catId) }
                    : {},
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "cat_details",
                },
            },
            {
                $unwind: {
                    path: "$cat_details",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $match: {
                    "cat_details.deleted": false,
                },
            },
            {
                $project: {
                    _id: 1,
                    item_name: 1,
                    price: 1,
                    img_url: 1,
                    category_id: 1,
                    cat_name: "$cat_details.cat_name",
                    deleted: 1,
                },
            },
            {
                $sort: {
                    _id: -1,
                },
            },
            ...(page && perPage
                ? [
                      {
                          $skip: (page - 1) * perPage,
                      },
                      {
                          $limit: perPage,
                      },
                  ]
                : []),
        ]);
        const count = await ItmModel.countDocuments(
            catId ? { category_id: catId } : {}
        );

        const images = await Promise.all(
            data.map((row) =>
                getSignedUrl(row.img_url, global.config.s3.BUCKET_NAME)
            )
        );
        for (let i in images) {
            data[i].img_url = images[i];
        }

        res.json({
            success: true,
            message: "Data fetched successfully",
            data: data,
            count: count,
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

exports.updateItems = async (req, res) => {
    try {
        const itemId = req.params.itemId;

        let updateData = {
            item_name: req.body.itemName,
            price: req.body.price,
            category_id: req.body.catId,
        };
        if (req.file?.filename) {
            const fileContent = fs.readFileSync(
                process.cwd() + "/public/uploads/" + req.file.filename
            );
            const s3Response = await writeToS3(
                fileContent,
                path.extname(req.file.filename),
                req.file.filename,
                global.config.s3.BUCKET_NAME,
                global.config.s3.BUCKET_FOLDER
            );

            updateData.img_url = s3Response.Key;

            // let itemData = await ItmModel.findById(itemId);
            // try {
            //     fs.unlinkSync(
            //         process.cwd() + "/public/uploads/" + itemData.img_url
            //     );
            // } catch (err) {
            //     console.log(err);
            // }
        }
        await ItmModel.findByIdAndUpdate(itemId, updateData);
        res.json({
            success: true,
            message: "Data updated successfully",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err,
        });
    } finally {
        try {
            if (req.file) {
                setTimeout(() => {
                    fs.unlinkSync(
                        process.cwd() + "/public/uploads/" + req.file?.filename
                    );
                }, 5000);
            }
        } catch (err) {
            console.log(err);
        }
    }
};

exports.deleteItems = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        await ItmModel.findByIdAndUpdate(itemId, { deleted: true });
        res.json({
            success: true,
            message: "Data deleted successfully",
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

exports.getAllItems = async (req, res) => {
    try {
        const data = await ItmModel.aggregate([
            {
                $match: { deleted: false },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "cat_details",
                },
            },
            {
                $unwind: {
                    path: "$cat_details",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $match: {
                    "cat_details.deleted": false,
                },
            },
            {
                $project: {
                    _id: 1,
                    item_name: 1,
                    price: 1,
                    img_url: 1,
                    category_id: 1,
                    cat_name: "$cat_details.cat_name",
                },
            },
        ]);
        const images = await Promise.all(
            data.map((row) =>
                getSignedUrl(row.img_url, global.config.s3.BUCKET_NAME)
            )
        );
        for (let i in images) {
            data[i].img_url = images[i];
        }

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

exports.getProducts = async (req, res) => {
    try {
        const { searchKey } = req.body;
        const data = await ItmModel.aggregate([
            {
                $match: {
                    deleted: false,
                    ...(searchKey && {
                        item_name: {
                            $regex: "Fry",
                            $options: "i",
                        },
                    }),
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category_id",
                    foreignField: "_id",
                    as: "cat_details",
                },
            },
            {
                $unwind: {
                    path: "$cat_details",
                    preserveNullAndEmptyArrays: false,
                },
            },
            {
                $match: {
                    "cat_details.deleted": false,
                },
            },
            {
                $project: {
                    _id: 1,
                    item_name: 1,
                    price: 1,
                    img_url: 1,
                    category_id: 1,
                    cat_name: "$cat_details.cat_name",
                },
            },
            {
                $group: {
                    _id: "$category_id",
                    cat_name: {
                        $max: "$cat_name",
                    },
                    items: {
                        $push: "$$ROOT",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    category_id: "$_id",
                    category_name: "$cat_name",
                    items: "$items",
                },
            },
            {
                $sort: {
                    category_name: 1,
                },
            },
        ]);

        // data.forEach(async (category, index) => {
        for (let i in data) {
            const category = data[i];
            console.log(data[i].items);
            const images = await Promise.all(
                category.items.map((row) =>
                    row.img_url ? getSignedUrl(row.img_url, global.config.s3.BUCKET_NAME) : ""
                )
            );
            for (let j in images) {
                data[i].items[j].img_url = images[j];
            }
        }

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

exports.getAutocompleteData = async (req, res) => {
    try {
        res.json({
            success: true,
            message: "Data fetched successfully",
            //data: data
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
