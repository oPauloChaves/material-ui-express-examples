const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/', [require('./route_upload')]);

app.use((err, _req, res, _next) => {
  res.status(500).json({
    ok: false,
    message: err.message || 'Internal server error',
    errors: [err],
  });
});

const PORT = process.env.PORT || 3000;

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  })
  .on('error', err => {
    console.log('ERROR: ', err);
  });
