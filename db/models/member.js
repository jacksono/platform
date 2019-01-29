const member = (db, DataTypes) => {
  const Member = db.define(
    'members',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  );

  return Member;
};

module.exports = member;
