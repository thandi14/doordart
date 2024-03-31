'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResturantTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ResturantTime.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
    }
  }
  ResturantTime.init({
    resturantId: DataTypes.INTEGER,
    monday: DataTypes.STRING,
    tuesday: DataTypes.STRING,
    wednesday: DataTypes.STRING,
    thursday: DataTypes.STRING,
    friday: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ResturantTime',
  });
  return ResturantTime;
};
