const router = require("express").Router();
const middleware = require('../../middlewares');

// controllers
const loginController = require('../../controller/login');
const catController = require('../../controller/categories');
const itmController = require('../../controller/items');
// const facilitiesController = require('../../controller/facilities');
// const doctorsController = require("../../controller/doctors");
// const commonController =require('../../controller/common');
// const bannerController = require('../../controller/banner');
// const galleryController = require('../../controller/gallery');
// const blogesController = require('../../controller/bloges');
// const feedbackController = require('../../controller/feedback');
// const faqConstroller = require('../../controller/faq');


// login route
router.post('/login', loginController.login);
// categories routes
router.post('/add-category',middleware.validateToken, middleware.uploadImg, catController.addCategories);
router.get('/list-category',middleware.validateToken, catController.listCategories);
router.get('/catgory-dropdown',middleware.validateToken, catController.categoryListDropdown);
router.put("/update-category/:catId",middleware.validateToken, middleware.uploadImg, catController.updateCategories);
router.delete("/delete-category/:catId",middleware.validateToken, catController.deleteCategories);
//items routes
router.post('/add-items',middleware.validateToken, middleware.uploadImg, itmController.addItems);
router.get('/list-items',middleware.validateToken, itmController.listItems);
router.put("/update-item/:itemId",middleware.validateToken, middleware.uploadImg, itmController.updateItems);
router.delete("/delete-item/:itemId",middleware.validateToken, itmController.deleteItems);

// //facilites
// router.post('/add-facilities',middleware.validateToken, middleware.uploadImg, facilitiesController.addFacilities);
// router.get('/list-facilities',middleware.validateToken, facilitiesController.listFacilities);
// router.put("/update-facilities/:facilityId",middleware.validateToken, middleware.uploadImg, facilitiesController.updateFacilities);
// router.delete("/delete-facilities/:facilityId",middleware.validateToken, facilitiesController.deleteFacilities);

// //doctors
// router.post('/add-doctors',middleware.validateToken, middleware.uploadImg, doctorsController.addDoctors);
// router.get('/list-doctors',middleware.validateToken, doctorsController.listDoctors);
// router.put("/update-doctors/:doctorId",middleware.validateToken, middleware.uploadImg, doctorsController.updateDoctors);
// router.delete("/delete-doctors/:doctorId",middleware.validateToken, doctorsController.deleteDoctors);

// //country
// // router.get('/list-countrys',middleware.validateToken, commonController.Country);

// //Banner
// router.post('/add-banner-images',middleware.validateToken, middleware.uploadImg, bannerController.addImages);
// router.get('/list-banner-images',middleware.validateToken, bannerController.listImages);
// router.delete("/delete-banner-images/:bannerimagesId",middleware.validateToken, bannerController.deleteImages);

// //Gallery
// router.post('/add-gallery-images',middleware.validateToken, middleware.uploadImg, galleryController.addImages);
// router.get('/list-gallery-images',middleware.validateToken, galleryController.listImages);
// router.delete("/delete-gallery-images/:galleryimagesId",middleware.validateToken, galleryController.deleteImages);

// //Blog
// router.post('/add-bloges',middleware.validateToken, middleware.uploadImg, blogesController.addBloges);
// router.get('/list-bloges',middleware.validateToken, blogesController.listBloges);
// router.put("/update-bloges/:blogId",middleware.validateToken, middleware.uploadImg, blogesController.updateBloges);
// router.delete("/delete-bloges/:blogId",middleware.validateToken, blogesController.deleteBloges);

// //FeedBack
// router.post('/add-feedbacks',middleware.validateToken, middleware.uploadImg, feedbackController.addFeedbackes);
// router.get('/list-feedbacks',middleware.validateToken, feedbackController.listFeedbackes);
// router.put("/update-feedbacks/:fdId",middleware.validateToken, middleware.uploadImg, feedbackController.updateFeedbackes);
// router.delete("/delete-feedbacks/:fdId",middleware.validateToken, feedbackController.deleteFeedbackes);

// //FAQs
// router.post('/add-faq',middleware.validateToken, middleware.uploadImg, faqConstroller.addFaq);
// router.get('/list-faq',middleware.validateToken, faqConstroller.listFaq);
// router.put("/update-faq/:faqId",middleware.validateToken, middleware.uploadImg, faqConstroller.updateFaq);
// router.delete("/delete-faq/:faqId",middleware.validateToken, faqConstroller.deleteFaq);


module.exports = router;