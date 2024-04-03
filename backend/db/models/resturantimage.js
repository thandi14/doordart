'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResturantImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ResturantImage.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
    }
  }
  ResturantImage.init({
    resturantId: DataTypes.INTEGER,
    bannerUrl: DataTypes.TEXT,
    thumbnailUrl: DataTypes.TEXT,
    iconUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ResturantImage',
  });
  return ResturantImage;
};
