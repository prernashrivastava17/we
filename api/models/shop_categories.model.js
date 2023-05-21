module.exports = (sequelize, Sequelize) => {
    const shop_categories = sequelize.define("shop_categories", {
      name: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER(11)
      },
      img: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
      }
    },
      {
        timestamps: true
      });
  
    return shop_categories;
  };