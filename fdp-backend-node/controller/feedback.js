// const feedbackSchema = require("../database/models/feedback");
// const { writeToS3, getSignedUrl } = require("../utility/s3.service");
// const mongoose = require("mongoose");
// const fs = require("fs");
// var path = require("path");

// exports.addFeedbackes = async (req, res) => {
//     try {
//         const { fdName, fdRating, fdSubject, fdMessage, fdDisplayhomepageButton} = req.body;
//         // const fileContent = fs.readFileSync(
//         //     process.cwd() + "/public/uploads/" + req.file.filename
//         // );
//         // const s3Response = await writeToS3(
//         //     fileContent,
//         //     path.extname(req.file.filename),
//         //     req.file.filename,
//         //     global.config.s3.BUCKET_NAME,
//         //     global.config.s3.BUCKET_FOLDER
//         // );

//         await feedbackSchema.create({
//             fd_name: fdName,
//             fd_rating: fdRating,
//             fd_subject: fdSubject,
//             fd_message: fdMessage,
//             // publish_status: publishStatus,
//             fd_dishompagButton: fdDisplayhomepageButton,
            
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
//     } 
//     // finally {
//     //     try {
//     //         setTimeout(() => {
//     //             fs.unlinkSync(
//     //                 process.cwd() + "/public/uploads/" + req.file.filename
//     //             );
//     //         }, 5000);
//     //     } catch (err) {
//     //         console.log(err);
//     //     }
//     // }
// };

// exports.listFeedbackes = async (req, res) => {
//     try {
//         let { page, perPage } = req.query; //object destructuring
//         page = parseInt(page);
//         perPage = parseInt(perPage);
//         const data = await feedbackSchema.find({deleted: false})
//             .sort({ _id: -1 })
//             .skip((page - 1) * perPage)
//             .limit(perPage); //pagenation
//         const count = await feedbackSchema.count();

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

// exports.updateFeedbackes = async (req, res) => {
//     try {
//         const fdId = req.params.fdId;
//         const { fdName, fdRating, fdSubject,fdMessage, fdDisplayhomepageButton } = req.body;
        
//         let updateData = {
//             fd_name: fdName,
//             fd_rating: fdRating,
//             fd_subject: fdSubject,
//             fd_message: fdMessage,
//             // publish_status: publishStatus,
//             fd_dishompagButton: fdDisplayhomepageButton,

//         };
//         if (req.file?.filename) {
//             // const fileContent = fs.readFileSync(
//             //     process.cwd() + "/public/uploads/" + req.file.filename
//             // );
//             // const s3Response = await writeToS3(
//             //     fileContent,
//             //     path.extname(req.file.filename),
//             //     req.file.filename,
//             //     global.config.s3.BUCKET_NAME,
//             //     global.config.s3.BUCKET_FOLDER
//             // );

//             // updateData.img_url = s3Response.Key;
//             // let catData = await CatModel.findById(catId);
//             // try {
//             //     fs.unlinkSync(
//             //         process.cwd() + "/public/uploads/" + catData.img_url
//             //     );
//             // } catch (err) {
//             //     console.log(err);
//             // }
//         }
//         await feedbackSchema.findByIdAndUpdate(fdId, updateData);
//         res.json({
//             success: true,
//             message: "Data updated successfully",
            
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error",
//             error: err,
//         });
//     } 
//     // finally {
//     //     try {
//     //         if (req.file) {
//     //             setTimeout(() => {
//     //                 fs.unlinkSync(
//     //                     process.cwd() + "/public/uploads/" + req.file?.filename
//     //                 );
//     //             }, 5000);
//     //         }
//     //     } catch (err) {
//     //         console.log(err);
//     //     }
//     // }
// };

// exports.deleteFeedbackes = async (req, res) => {
//     try {
//         const fdId = req.params.fdId;
//         await feedbackSchema.findByIdAndUpdate(fdId, { deleted: true });
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
