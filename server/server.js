const express = require('express');
const bodyParser = require('body-parser');
const Busboy = require('busboy');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.disable('x-powered-by');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

app.post('/', async (req, res, next) => {
  try {
    const busboy = new Busboy({ headers: req.headers });
    const files = {};
    const buffers = {};
    const fields = [];

    await sleep(1000);

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(
        `File [${fieldname}]: filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`,
      );
      files[fieldname] = [];

      file.on('data', data => files[fieldname].push(data));

      file.on('end', () => {
        buffers[fieldname] = Buffer.concat(files[fieldname]);
      });
    });

    busboy.on(
      'field',
      (fieldname, value, _fieldnameTruncated, _valTruncated, _encoding, _mimetype) => {
        fields.push({ fieldname, value });
      },
    );

    busboy.on('finish', () => {
      console.log('DONE');
      Object.keys(buffers).forEach(key => {
        console.log(buffers[key].length);
      });
      res.status(200).json(fields);
    });
    req.pipe(busboy);
  } catch (error) {
    next(error);
  }
});

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
