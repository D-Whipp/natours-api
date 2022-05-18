// normally you keep all the express configuration in app.js
// Restful API: Representational State Transfer
// Building it requires following these principles:
// 1: Separate API into logical resources
// 2: Expose structured, resource-based URLs
// 3: Use HTTP methods (verbs) - CRUD - POST, GET, PUT, PATCH, DELETE
// 4: Send data as JSON (usually)
// 5: Be stateless

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side!', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('You can post to this endpoint now');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
