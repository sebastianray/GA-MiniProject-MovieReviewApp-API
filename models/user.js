'use strict';
const {encryptPwd} = require('../helpers/bcrypt')

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Movie, {through:'models.Review'});
      User.hasMany(models.Review);
    }
  };
  User.init({
    username: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Username must be filled thanks."
        },
        isEmail : {
          msg : "Email is not valid."
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Password must be filled thanks."
        }
      }
    },
    name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Name must be filled thanks."
        }
      }
    },
    image: DataTypes.STRING,
    role: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : "Role must be filled thanks."
        }
      }
    }
  }, {
    hooks : {
      beforeCreate(user){
        user.password = encryptPwd(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};