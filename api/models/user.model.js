  module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.INTEGER(11),
        defaultValue: 2 // 1 for admin , 2 for user
      },
      phone: {
        type: Sequelize.BIGINT(11)
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      profile_img: {
        type: Sequelize.STRING
      },
      email_otp: {
        type: Sequelize.STRING
      },
      resetPasswordExpires: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false, 
        defaultValue: true
      }
    }, {
      timestamps: true
    });
  
    return Users;
  };