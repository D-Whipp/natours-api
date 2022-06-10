// normally you keep all the express configuration in app.js
// Restful API: Representational State Transfer
// Building it requires following these principles:
// 1: Separate API into logical resources
// 2: Expose structured, resource-based URLs
// 3: Use HTTP methods (verbs) - CRUD - POST, GET, PUT, PATCH, DELETE
// 4: Send data as JSON (usually)
// 5: Be stateless

const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// *** Middleware ***

app.use(morgan('dev'));

// Middleware is a function that can modify incoming data
// Middleware is a function that is executed between receiving the request and sending the response
// Middleware executes in order so order matters
// If a route exists before middleware that middleware won't execute because it comes after the route
// express.json() returns a function and that function is added to the middleware stack
app.use(express.json());
// we can add functions to the middleware stack with 'app.use()'
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  // you NEED to call next or the req, res cycle would be stuck
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) Route Handlers

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Invalid ID',
  //   });
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  //   console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) Routes

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

// 4) Start Server

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
