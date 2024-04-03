'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ItemOption.belongsTo(
        models.MenuItem,
          { foreignKey: 'itemId' }
      );
    }
  }
  ItemOption.init({
    itemId: DataTypes.INTEGER,
    option: DataTypes.STRING,
    selection: DataTypes.STRING,
    cals: DataTypes.STRING,
    price: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'ItemOption',
  });
  return ItemOption;
};
