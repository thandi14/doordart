'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Deal.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
      Deal.hasMany(
        models.ShoppingCart,
          { foreignKey: 'offerId' }
      );
    }
  }
  Deal.init({
    itemId: DataTypes.INTEGER,
    deal: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    type: {
      type: DataTypes.STRING,
      isIn: [['%', '$']],
    },
  }, {
    sequelize,
    modelName: 'Deal',
  });
  return Deal;
};