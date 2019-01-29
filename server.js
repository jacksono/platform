const { db } = require('./db');
require('dotenv').config();
const app = require('./app.js');

const port = process.env.PORT_API || 8000;
db.sync().then(() => {
  app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
});
