'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MenuItem.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
      MenuItem.hasMany(
        models.ItemOption,
          { foreignKey: 'itemId', onDelete: 'CASCADE',  hooks: true }
      );
    }
  }
  MenuItem.init({
    resturantId: DataTypes.INTEGER,
    item: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.NUMBER,
    cals: DataTypes.STRING,
    category: DataTypes.STRING,
    imgUrl: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MenuItem',
  });
  return MenuItem;
};