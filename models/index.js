// import all models
const Cart = require('./cart');
const User = require('./User');
const Books = require('./books');
const Purchase = require('./purchase');

// create associations
User.hasMany(Cart, {
  foreignKey: 'user_id'
});

Cart.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});
User.hasMany(Purchase, {
    foreignKey: 'user_id'
  });
  
Purchase.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });


module.exports = { User, Purchase,Cart,Books};
