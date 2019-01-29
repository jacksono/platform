const plan = (db, DataTypes) => {
  const Plan = db.define(
    'plans',
    {
      planName: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      startDate: {
        type: DataTypes.STRING,
      },
      endDate: {
        type: DataTypes.STRING,
      }
    },
  );
  return Plan;
};

module.exports = plan;
