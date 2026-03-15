'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_review extends Model {
    static associate(models) {
      Book_rating.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
      Book_rating.belongsTo(models.Book, { foreignKey: "book_id", as: "book" })
    }
  }
  Book_review.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Book_review',
  });
  return Book_review;
};