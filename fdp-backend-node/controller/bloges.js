// const blogesSchema = require("../database/models/bloges");
// const { writeToS3, getSignedUrl } = require("../utility/s3.service");
// const mongoose = require("mongoose");
// const fs = require("fs");
// var path = require("path");

// exports.addBloges = async (req, res) => {
//     try {
//         const { blogTitle, blogCat, blogAuth, blogFeatures, blogTags, blogContent } = req.body;
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

//         await blogesSchema.create({
//             blog_title: blogTitle,
//             blog_category: blogCat,
//             blog_author: blogAuth,
//             blog_feablogButton: blogFeatures,
//             // publish_status: publishStatus,
//             blog_tags: blogTags,
//             blog_content: blogContent,
//             img_upload: s3Response.Key,
            
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

// exports.listBloges = async (req, res) => {
//     try {
//         let { page, perPage } = req.query; //object destructuring
//         page = parseInt(page);
//         perPage = parseInt(perPage);
//         const data = await blogesSchema.find({deleted: false})
//             .sort({ _id: -1 })
//             .skip((page - 1) * perPage)
//             .limit(perPage); //pagenation
//         const count = await blogesSchema.count();

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

// exports.updateBloges = async (req, res) => {
//     try {
//         const blogId = req.params.blogId;
//         const { blogTitle, blogCat, blogAuth,blogFeatures, blogTags, blogContent } = req.body;
        
//         let updateData = {
//             blog_title: blogTitle,
//             blog_category: blogCat,
//             blog_author: blogAuth,
//             blog_feablogButton: blogFeatures,
//             // publish_status: publishStatus,
//             blog_tags: blogTags,
//             blog_content: blogContent,
            

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
//         await blogesSchema.findByIdAndUpdate(blogId, updateData);
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

// exports.deleteBloges = async (req, res) => {
//     try {
//         const blogId = req.params.blogId;
//         await blogesSchema.findByIdAndUpdate(blogId, { deleted: true });
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
