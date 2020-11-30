'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.User, {through:'models.Review'});
      Movie.hasMany(models.Review);
    }
  };
  Movie.init({
    title: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie title must be filled ."
        }
      }
    },
    synopsis: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie synopsis must be filled ."
        }
      }
    },
    genre: DataTypes.INTEGER,
    poster: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie poster must be filled ."
        },
        isUrl : {
          msg : "Movie poster must be URL format thanks."
        }
      }
    },
    trailer:{
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie trailer must be filled ."
        },
        isUrl : {
          msg : "Movie trailer must be URL format thanks."
        }
      }
    },
    rated: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie rate must be filled ."
        }
      }
    },
    voteCount: DataTypes.INTEGER,
    releaseDate: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Release date must be filled ."
        }
      }
    },
    language: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Movie language must be filled ."
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};