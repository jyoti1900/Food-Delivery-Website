const CatModel = require("../database/models/categories");
const { writeToS3, getSignedUrl } = require("../utility/s3.service");
const fs = require("fs");
var path = require("path");

exports.addCategories = async (req, res) => {
    try {
        const catName = req.body.catName;

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

        await CatModel.create({
            cat_name: catName,
            img_url: s3Response.Key,
        });

        res.json({
            success: true,
            message: "Data inserted successfully",
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

exports.listCategories = async (req, res) => {
    try {
        let { page, perPage } = req.query; //object destructuring
        page = parseInt(page);
        perPage = parseInt(perPage);
        const data = await CatModel.find()
            .sort({ _id: -1 })
            .skip((page - 1) * perPage)
            .limit(perPage); //pagenation
        const count = await CatModel.count();

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

exports.updateCategories = async (req, res) => {
    try {
        const catId = req.params.catId;
        const catName = req.body.catName;

        let updateData = {
            cat_name: catName,
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
            // let catData = await CatModel.findById(catId);
            // try {
            //     fs.unlinkSync(
            //         process.cwd() + "/public/uploads/" + catData.img_url
            //     );
            // } catch (err) {
            //     console.log(err);
            // }
        }
        await CatModel.findByIdAndUpdate(catId, updateData);
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

exports.categoryListDropdown = async (req, res) => {
    try {
        const data = await CatModel.find({ deleted: false })
            .select({ cat_name: 1 })
            .sort({ cat_name: 1 });
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

exports.deleteCategories = async (req, res) => {
    try {
        const catId = req.params.catId;
        await CatModel.findByIdAndUpdate(catId, { deleted: true });
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
