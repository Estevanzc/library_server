'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Preference, {foreignKey: "user_id", as: "preferences"})
      User.hasMany(models.Book_view, {foreignKey: "user_id", as: "views"})
      User.hasMany(models.Book_rating, {foreignKey: "user_id", as: "ratings"})
      User.hasMany(models.Book_review, {foreignKey: "user_id", as: "reviews"})
      User.hasMany(models.Favorite, {foreignKey: "user_id", as: "favorites"})
      User.hasMany(models.Loan, {foreignKey: "user_id", as: "loans"})
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [3, 100],
          msg: "Name must have length between 1 and 100"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: {
          args: [3, 100],
          msg: "Name must have length between 3 and 100"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        hasMinLength(value) {
          if (value.length < 3) {
            throw new Error("Password must be at least 3 characters long");
          }
        },
        hasNumber(value) {
          if (!/\d/.test(value)) {
            throw new Error("Password must contain at least one number");
          }
        }
      }
    },
    birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        notInFuture(value) {
          const today = new Date();
          const inputDate = new Date(value);
          today.setHours(0, 0, 0, 0);
          if (inputDate > today) {
            throw new Error("Date cannot be in the future");
          }
        }
      },
    },
    type: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    registration: {
      type: DataTypes.STRING,
      unique: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
    },
    banner: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};