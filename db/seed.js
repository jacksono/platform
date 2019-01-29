const { db } = require('../db');

/* eslint no-console:0 */
const seedPlans = () => db.Promise.map([
  {
    planName: 'gold',
    type: 'recurrent'
  },
  {
    planName: 'silver',
    type: 'time-limited',
    startDate: '10/10/2019',
    endDate: '20/10/2019'
  },
], plan => db.model('plans').create(plan));

const seedMembers = () => db.Promise.map([
  {
    firstName: 'Mark',
    lastName: 'Namara',
    dob: '12/12/2009',
    planId: '1'
  },
  {
    firstName: 'Jane',
    lastName: 'Bash',
    dob: '10/9/2003',
    planId: '2'
  },
], member => db.model('members').create(member));


db.sync({ force: true })
  .then(seedPlans)
  .then(plan => console.log(`Seeded ${plan.length} plans OK`))
  .then(seedMembers)
  .then(member => console.log(`Seeded ${member.length} members OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
