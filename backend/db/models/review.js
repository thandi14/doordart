'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
      Review.belongsTo(
        models.User,
          { foreignKey: 'userId' }
      );
    }
  }
  Review.init({
    userId: DataTypes.INTEGER,
    resturantId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      max: 5,
      min: 0,
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
