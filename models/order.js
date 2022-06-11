const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// create our Post model
class Books extends Model {

}

// create fields/columns for Post model
order.init(
  {
    orderid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      },
  },
  {
    sequelize,
    freezeTablename: true,
    underscored: true,
    modelname:'order'
  }
);

module.exports = Order;
