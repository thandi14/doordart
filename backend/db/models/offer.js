'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Offer.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
    }
  }
  Offer.init({
    resturantId: DataTypes.INTEGER,
    offer: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};
