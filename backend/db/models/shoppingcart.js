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
      ShoppingCart.belongsTo(
        models.Restaurant,
          { foreignKey: 'restaurantId' }
      );
      ShoppingCart.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
      ShoppingCart.belongsTo(
        models.Offer,
          { foreignKey: 'offerId' }
      );
      ShoppingCart.belongsTo(
        models.Deal,
          { foreignKey: 'dealId' }
      );
      ShoppingCart.hasMany(
        models.CartItem,
          { foreignKey: 'cartId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  ShoppingCart.init({
    restaurantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    offerId: DataTypes.INTEGER,
    dealId: DataTypes.INTEGER,
    tip: DataTypes.INTEGER,
    fees: DataTypes.INTEGER,
    gift: DataTypes.BOOLEAN,
    pickup: DataTypes.BOOLEAN,
    group: DataTypes.BOOLEAN,
    price: DataTypes.NUMBER,
    status: DataTypes.STRING,
    sessionId: {
      type: DataTypes.STRING,
      defaultValue: "Ordering"
    }
  }, {
    sequelize,
    modelName: 'ShoppingCart',
  });
  return ShoppingCart;
};
