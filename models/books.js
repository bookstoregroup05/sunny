const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Books extends Model {

}

// create fields/columns for Post model
Books.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    booktype: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    bookname: {
      type: DataTypes.STRING,
      allowNull: false  
    },
    bookimage: {
      type: DataTypes.STRING,
      allowNull: false  
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTablename: true,
    underscored: true,
    modelname:'book'
  }
);

module.exports = Books;
