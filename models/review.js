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
      Review.belongsTo(models.User);
      Review.belongsTo(models.Movie);
    }
  };
  Review.init({
    UserId: DataTypes.INTEGER,
    MovieId: DataTypes.INTEGER,
    rating: {
      type : DataTypes.INTEGER,
      validate : {
        min: 0,
        max: 10,
        notEmpty: {
          msg : "Rating must be filled thanks."
        },
        isNumeric : {
          msg : "Rating must be a number from 0 to 10."
        }
      }
    },
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};