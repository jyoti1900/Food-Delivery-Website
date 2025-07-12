// const doctorsModel = require("../database/models/doctors");
// const { writeToS3, getSignedUrl } = require("../utility/s3.service");
// const mongoose = require("mongoose");
// const fs = require("fs");
// var path = require("path");

// exports.addDoctors = async (req, res) => {
//     try {
//         const { firstName, lastName, userName, docAge, docDob, docDepartment, docCountry, docState, docPhone, docAltphone, docAvailability, docSpecialties, docAbout, docExperience, docHonores, docEducation  } = req.body;
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
//         console.log(docAvailability);
//         await doctorsModel.create({
//             first_name: firstName,
//             last_name: lastName,
//             username: userName,
//             age: docAge,
//             dob: docDob,
//             department: docDepartment,
//             country: docCountry,
//             state: docState,
//             mobile: docPhone,
//             alternative_mobile: docAltphone,
//             availability: JSON.parse(docAvailability),
//             specialties: docSpecialties,
//             about: docAbout,
//             experience: docExperience,
//             Award: docHonores,
//             education: docEducation,
//             doctor_img: s3Response.Key,
            
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

// exports.listDoctors = async (req, res) => {
//     try {
//         let { page, perPage } = req.query; //object destructuring
//         page = parseInt(page);
//         perPage = parseInt(perPage);
//         const data = await doctorsModel.find({deleted: false})
//             .sort({ _id: -1 })
//             .skip((page - 1) * perPage)
//             .limit(perPage); //pagenation
//         const count = await doctorsModel.count();

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

// exports.updateDoctors = async (req, res) => {
//     try {
//         const doctorId = req.params.doctorId;
//         const { firstName, lastName, userName, docAge, docDob, docDepartment, docCountry, docState, docPhone, docAltphone, docAvailability, docSpecialties, docAbout, docExperience, docHonores, docEducation  } = req.body;
        
//         let updateData = {
//             first_name: firstName,
//             last_name: lastName,
//             username: userName,
//             age: docAge,
//             dob: docDob,
//             department: docDepartment,
//             country: docCountry,
//             state: docState,
//             mobile: docPhone,
//             alternative_mobile: docAltphone,
//             availability: JSON.parse(docAvailability),
//             specialties: docSpecialties,
//             about: docAbout,
//             experience: docExperience,
//             Award: docHonores,
//             education: docEducation,

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
//         await doctorsModel.findByIdAndUpdate(doctorId, updateData);
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

// exports.deleteDoctors = async (req, res) => {
//     try {
//         const doctorId = req.params.doctorId;
//         await doctorsModel.findByIdAndUpdate(doctorId, { deleted: true });
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
