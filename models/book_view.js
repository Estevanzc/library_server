'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book_view extends Model {
    static associate(models) {
      Book_rating.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
      Book_rating.belongsTo(models.Book, { foreignKey: "book_id", as: "book" })
    }
  }
  Book_view.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Book_view',
  });
  return Book_view;
};