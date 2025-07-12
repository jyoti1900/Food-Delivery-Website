// const galleryModel = require("../database/models/gallery");
// const { writeToS3, getSignedUrl } = require("../utility/s3.service");
// const mongoose = require("mongoose");
// const fs = require("fs");
// var path = require("path");


// exports.addImages = async (req, res) => {
//     try {
//         // Fetch the current image count
//         const currentCount = await galleryModel.countDocuments();
        
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
//         await galleryModel.create({
//             gallery_img: s3Response.Key,
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
//         const data = await galleryModel.find({deleted: false})
//             .sort({ _id: -1 })
//             .skip((page - 1) * perPage)
//             .limit(perPage); //pagenation
//         const count = await galleryModel.count();

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
//         const galleryimagesId = req.params.galleryimagesId;
//         await galleryModel.findByIdAndUpdate(galleryimagesId, { deleted: true });
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
