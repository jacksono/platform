const Sequelize = require('sequelize');
require('dotenv').config();


let url = process.env.DATABASE_URL;

if (process.env.NODE_ENV === 'test') {
  url = process.env.TEST_DATABASE_URL;
}

const db = new Sequelize(
  url,
  {
    logging: false,
    define:
      {
        // automatically include timestamp columns
        timestamps: true,
      },
  },
);

const Plan = db.import('./models/plan');
const Member = db.import('./models/member');

Plan.hasMany(Member);
Member.belongsTo(Plan);

module.exports = { db, Plan, Member };
