'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    isbn: DataTypes.STRING,
    leanguage_id: DataTypes.INTEGER,
    sinopsis: DataTypes.TEXT,
    pages: DataTypes.INTEGER,
    publication_year: DataTypes.INTEGER,
    publisher_id: DataTypes.INTEGER,
    cover: DataTypes.STRING,
    inventory: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};