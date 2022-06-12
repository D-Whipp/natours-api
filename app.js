// normally you keep all the express configuration in app.js
// Restful API: Representational State Transfer
// Building it requires following these principles:
// 1: Separate API into logical resources
// 2: Expose structured, resource-based URLs
// 3: Use HTTP methods (verbs) - CRUD - POST, GET, PUT, PATCH, DELETE
// 4: Send data as JSON (usually)
// 5: Be stateless
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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
// app.use((req, res, next) => {
// console.log('Hello from the middleware');
// you NEED to call next or the req, res cycle would be stuck
// next();
// });
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
