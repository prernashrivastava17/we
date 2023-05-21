module.exports = (sequelize, Sequelize) => {
    const products = sequelize.define(
      "shop",
      {
        name: {
          type: Sequelize.STRING,
        },
        businessName: {
            type: Sequelize.STRING,
        },
        area: {
            type: Sequelize.STRING,
        },
        since: {
            type: Sequelize.DATE(6),
        },
        number:{
            type: Sequelize.INTEGER
        },
        city:{
            type: Sequelize.STRING,
        },
        pincode:{
            type: Sequelize.INTEGER
        },
        categoryId: {
          type: Sequelize.INTEGER(11),
        },
        userId: {
          type: Sequelize.INTEGER(11),
        },
        img: {
          type: Sequelize.TEXT,
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        timestamps: true,
      }
    );
  
    return products;
  };
  