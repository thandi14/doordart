'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(
        models.MenuItem,
          { foreignKey: 'itemId' }
      );
    }
  }
  Like.init({
    itemId: DataTypes.INTEGER,
    thumbsUp: DataTypes.BOOLEAN,
    thumbsDown: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
