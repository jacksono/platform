const member = (db, DataTypes) => {
  const Member = db.define(
    'members',
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      dob: {
        type: DataTypes.STRING,
      },
    },
  );

  return Member;
};

module.exports = member;
