// const facilitiesModel = require("../database/models/facilities");
// const { writeToS3, getSignedUrl } = require("../utility/s3.service");
// const mongoose = require("mongoose");
// const fs = require("fs");
// var path = require("path");

// exports.addFacilities = async (req, res) => {
//     try {
//         const { facilityName, description } = req.body;

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

//         await facilitiesModel.create({
//             name: facilityName,
//             description: description,
//             img_url: s3Response.Key,
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

// exports.listFacilities = async (req, res) => {
//     try {
//         let { page, perPage } = req.query; //object destructuring
//         page = parseInt(page);
//         perPage = parseInt(perPage);
//         const data = await facilitiesModel.find({deleted: false})
//             .sort({ _id: -1 })
//             .skip((page - 1) * perPage)
//             .limit(perPage); //pagenation
//         const count = await facilitiesModel.count();

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

// exports.updateFacilities = async (req, res) => {
//     try {
//         const facilityId = req.params.facilityId;
//         const { facilityName, description } = req.body;
        
//         let updateData = {
//             name: facilityName,
//             description: description,

//         };
//         if (req.file?.filename) {
//             const fileContent = fs.readFileSync(
//                 process.cwd() + "/public/uploads/" + req.file.filename
//             );
//             const s3Response = await writeToS3(
//                 fileContent,
//                 path.extname(req.file.filename),
//                 req.file.filename,
//                 global.config.s3.BUCKET_NAME,
//                 global.config.s3.BUCKET_FOLDER
//             );

//             updateData.img_url = s3Response.Key;
//             // let catData = await CatModel.findById(catId);
//             // try {
//             //     fs.unlinkSync(
//             //         process.cwd() + "/public/uploads/" + catData.img_url
//             //     );
//             // } catch (err) {
//             //     console.log(err);
//             // }
//         }
//         await facilitiesModel.findByIdAndUpdate(facilityId, updateData);
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
//     } finally {
//         try {
//             if (req.file) {
//                 setTimeout(() => {
//                     fs.unlinkSync(
//                         process.cwd() + "/public/uploads/" + req.file?.filename
//                     );
//                 }, 5000);
//             }
//         } catch (err) {
//             console.log(err);
//         }
//     }
// };

// exports.deleteFacilities = async (req, res) => {
//     try {
//         const facilityId = req.params.facilityId;
//         await facilitiesModel.findByIdAndUpdate(facilityId, { deleted: true });
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
