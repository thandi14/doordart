'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Save extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Save.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
      Save.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
    }
  }
  Save.init({
    resturantId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Save',
  });
  return Save;
};
