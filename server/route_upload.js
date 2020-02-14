const router = require('express').Router();
const Busboy = require('busboy');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

router.route('/upload').post(async (req, res, next) => {
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

module.exports = router;
