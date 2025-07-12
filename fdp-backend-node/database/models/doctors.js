// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const Times = {
//     TimeRanges: String,
// };
// const availabilitySchema = new Schema({
//     date: Date,
//     opd_start: Times,
//     opd_end: Times,
// });
// const doctorsSchema = new Schema({

//     first_name: {
//         type: String,
//         required: true
//     },
//     last_name: {
//         type: String,
//         required: true
//     },
//     username: {
//         type: String,
//         // required: true
//     },
//     age: {
//         type: String,
//         // required: true
//     },
//     dob: {
//         type: String,
//         // required: true
//     },
//     department: {
//         type: String,
//         required: true
//     },
//     country: {
//         type: String,
//         required: true
//     },
//     state: {
//         type: String,
//         // required: true
//     },
//     mobile: {
//         type: String,
//         required: true
//     },
//     alternative_mobile: {
//         type: String,
//         required: true
//     },
//     availability:[availabilitySchema],

//     specialties:{
//         type: [String],
//         required: true
//     },
//     about:{
//         type: String,
//         required: true
//     },
//     experience:{
//         type: String,
//         required: true
//     },
//     Award:{
//         type: String,
//         required: true
//     },
//     education:{
//         type: String,
//         required: true
//     },
//     doctor_img: {
//         type: String,
//         //required: true
//     },
//     deleted: {
//         type: Boolean,
//         default: false
//     }

// }, {timestamps: true});

// module.exports = mongoose.model('doctors', doctorsSchema);