'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Return extends Model {
    static associate(models) {
      Return.belongsTo(models.User, {foreignKey: "user_id", as: "user"})
      Return.belongsTo(models.Loan, {foreignKey: "loan_id", as: "loan"})
    }
  }
  Return.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    loan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Return',
  });
  return Return;
};