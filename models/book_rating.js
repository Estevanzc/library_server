'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_rating extends Model {
    static associate(models) {
      Book_rating.belongsTo(models.User, {foreignKey: "user_id", as: "user"})
      Book_rating.belongsTo(models.Book, {foreignKey: "book_id", as: "book"})
    }
  }
  Book_rating.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Book_rating',
  });
  return Book_rating;
};