const express = require('express');
const tourController = require('../controllers/tourController');
// const {
//   getAllTours,
//   createTour,
//   getTour,
//   updateTour,
//   deleteTour,
// } = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkID);

// Create a checkBody middleware
// Check if the body contains the name and price properties
// If not send back 400 response
// Add it to the post handler stack

// all these routes are on the same router and that's the 'app' function
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
