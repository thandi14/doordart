'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResturantTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ResturantTime.belongsTo(
        models.Resturant,
          { foreignKey: 'resturantId' }
      );
    }
  }
  ResturantTime.init({
    resturantId: DataTypes.INTEGER,
    monday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    tuesday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    wednesday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    thursday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
    friday: {
      type: DataTypes.STRING,
      validate: {
        is: /^(1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM) - (1[0-2]|0?[1-9])(:[0-5][0-9])? (AM|PM)$/
      }
    },
  }, {
    sequelize,
    modelName: 'ResturantTime',
  });
  return ResturantTime;
};
