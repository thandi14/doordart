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
      // define association here
    }
  }
  ItemOption.init({
    itemId: DataTypes.INTEGER,
    option: DataTypes.STRING,
    selection: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ItemOption',
  });
  return ItemOption;
};