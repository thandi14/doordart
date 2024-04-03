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
      Resturant.hasOne(
        models.ResturantImage,
          { foreignKey: 'resturantId', onDelete: 'CASCADE',  hooks: true }
      );
      Resturant.hasOne(
        models.ResturantTime,
          { foreignKey: 'resturantId', onDelete: 'CASCADE',  hooks: true }
      );
      Resturant.hasMany(
        models.Review,
          { foreignKey: 'resturantId', onDelete: 'CASCADE',  hooks: true }
      );
      Resturant.hasMany(
        models.Review,
          { foreignKey: 'resturantId', onDelete: 'CASCADE',  hooks: true }
      );
      Resturant.hasMany(
        models.Save,
          { foreignKey: 'resturantId', onDelete: 'CASCADE',  hooks: true }
      );
      Resturant.hasMany(
        models.ShoppingCart,
          { foreignKey: 'resturantId', onDelete: 'CASCADE',  hooks: true }
      );
      Resturant.hasMany(
        models.MenuItem,
          { foreignKey: 'resturantId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  Resturant.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    deliveryFee: DataTypes.NUMBER,
    deliveryTime: DataTypes.STRING,
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
