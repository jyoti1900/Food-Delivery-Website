// const bannerModel = require("../database/models/banner");
// const { writeToS3, getSignedUrl } = require("../utility/s3.service");
// const mongoose = require("mongoose");
// const fs = require("fs");
// var path = require("path");

// const MAX_IMAGE_LIMIT = 4; // Set your desired maximum image limit

// exports.addImages = async (req, res) => {
//     try {
//         // Fetch the current image count
//         const currentCount = await bannerModel.countDocuments();

//         // Check if the image limit has been reached
//         if (currentCount >= MAX_IMAGE_LIMIT) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Maximum image limit reached",
//             });
//         }

//         const fileContent = fs.readFileSync(
//             process.cwd() + "/public/uploads/" + req.file.filename
//         );
//         const s3Response = await writeToS3(
//             fileContent,
//             path.extname(req.file.filename),
//             req.file.filename,
//             global.config.s3.BUCKET_NAME,
//             global.config.s3.BUCKET_FOLDER
//         );

//         // Create a new gallery entry with the incremented count
//         await bannerModel.create({
//             banner_img: s3Response.Key,
//             time_count: currentCount + 1,
//         });

//         res.json({
//             success: true,
//             message: "Data inserted successfully",
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: err,
//         });
//     } finally {
//         try {
//             setTimeout(() => {
//                 fs.unlinkSync(
//                     process.cwd() + "/public/uploads/" + req.file.filename
//                 );
//             }, 5000);
//         } catch (err) {
//             console.log(err);
//         }
//     }
// };



// exports.listImages = async (req, res) => {
//     try {
//         let { page, perPage } = req.query; //object destructuring
//         page = parseInt(page);
//         perPage = parseInt(perPage);
//         const data = await bannerModel.find({deleted: false})
//             .sort({ _id: -1 })
//             .skip((page - 1) * perPage)
//             .limit(perPage); //pagenation
//         const count = await bannerModel.count();

//         const images = await Promise.all(
//             data.map((row) =>
//                 getSignedUrl(row.img_url, global.config.s3.BUCKET_NAME)
//             )
//         );
//         for (let i in images) {
//             data[i].img_url = images[i];
//         }

//         res.json({
//             success: true,
//             message: "Data fetched successfully",
//             data: data,
//             count: count,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: err,
//         });
//     }
// };

// exports.deleteImages = async (req, res) => {
//     try {
//         const bannerimagesId = req.params.bannerimagesId;
//         await bannerModel.findByIdAndUpdate(bannerimagesId, { deleted: true });
//         res.json({
//             success: true,
//             message: "Data deleted successfully",
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: err,
//         });
//     }
// };
