'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "user_id", as: "user" })
      Favorite.belongsTo(models.Book, { foreignKey: "book_id", as: "book" })
    }
  }
  Favorite.init({
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
    modelName: 'Favorite',
  });
  return Favorite;
};