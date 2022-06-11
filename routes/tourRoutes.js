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

router.param('id', tourController.checkID);

// all these routes are on the same router and that's the 'app' function
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
