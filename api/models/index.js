const dbConfig = require("../config/db.config");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.model')(sequelize,Sequelize);
db.shop_categories = require('./shop_categories.model')(sequelize,Sequelize)
db.shop = require('./shops.model')(sequelize,Sequelize)
db.contact_us = require('./contact_us.model')(sequelize,Sequelize)



db.user.hasMany(db.shop_categories, {
  foreignKey: "userId",
});
db.shop_categories.belongsTo(db.user, {
  foreignKey: "userId",
});

db.user.hasMany(db.shop, {
  foreignKey: "userId",
});
db.shop.belongsTo(db.user, {
  foreignKey: "userId",
});

db.shop_categories.hasMany(db.shop, {
  foreignKey: "categoryId",
});
db.shop.belongsTo(db.shop_categories, {
  foreignKey: "categoryId",
});
module.exports = db;
