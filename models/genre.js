'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.Book, { foreignKey: "genre_id", as: "books" })
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [1, 100],
          msg: "Name must have length between 1 and 100"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};