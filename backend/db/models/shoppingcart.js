'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShoppingCart.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
    }
  }
  ShoppingCart.init({
    resturantId: DataTypes.INTEGER,
    tip: DataTypes.INTEGER,
    fees: DataTypes.INTEGER,
    gift: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};
