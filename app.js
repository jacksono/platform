const express = require('express');
const jsonParser = require('body-parser').json;
const logger = require('morgan');


const app = express();
const router = express.Router();
app.use(logger('dev'));

app.use(jsonParser());

app.use('/api', router.get('/', (req, res) => {
  res.json({
    message: 'Success',
  });
}));


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
  next();
});

module.exports = app;
