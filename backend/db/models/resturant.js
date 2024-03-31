'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resturant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resturant.init({
    name: DataTypes.STRING,
    deliveryFee: DataTypes.INTEGER,
    deliveryTime: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    zipCode: DataTypes.INTEGER,
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    pickup: DataTypes.BOOLEAN,
    phone: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Resturant',
  });
  return Resturant;
};