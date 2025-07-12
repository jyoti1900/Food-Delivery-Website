// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const blogesSchema = new Schema(
//   {
//     blog_title: {
//         type: String,
//         required: true,
//     },
//     blog_category: {
//         type: String,
//         required: true,
//     },
//     blog_author: {
//         type: String,
//         required: true,
//     },
//     // publish_status: {
//     //     type: String,
//     //     enum: ["public", "private"], // Define allowed values using enum
//     //     required: true,
//     // },
//     blog_tags: {
//         type: [String],
//         required: true,
//     },
//     blog_feablogButton: {
//       type: String,
//       value: Boolean,
//   },
//     blog_content: {
//         type: String,
//         required: true,
//     },
//     img_upload: {
//       type: String,
//       //required: true
//     },
//     deleted: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("bloges", blogesSchema);
