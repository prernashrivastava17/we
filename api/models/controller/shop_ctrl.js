"use strict";
const Constant = require("../config/constant");
const db = require("../models");
const utility = require("../helpers/utility");
const shop_categories = db.shop_categories;
const shop = db.shop;
const { Op} = require("sequelize");

let categories = {};

categories.addCategory = async (req, res) => {
  try {
    let { name,img} = req.body;
    let { userId } = req.user;
    let Data = {
      name: name,
      userId: userId,
    };

    let result = await shop_categories.create(Data);
    if (result) {
      if (req.files) {
        img = await utility.fileupload(req.files);
        let userData = {
          img: img,
        };
        result.update(userData);
      }

      return res.status(Constant.SUCCESS_CODE).json({
        code: Constant.SUCCESS_CODE,
        massage: Constant.CATEGORY_SAVE_SUCCESS,
        data: result,
      });
    } else {
      return res.status(Constant.ERROR_CODE).json({
        code: Constant.ERROR_CODE,
        massage: Constant.SOMETHING_WENT_WRONG,
        data: result,
      });
    }
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.editCategory = async (req, res) => {
  try {
    let { id, name,img } = req.body;
    let { userId } = req.user;
    let Data = {
      name: name,
      userId: userId,
    };

    shop_categories
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          result.update(Data);
          if (req.files) {
            img = await utility.fileupload(req.files);
            let userData = {
              img: img,
            };
            result.update(userData);
          }
          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.CATEGORY_UPDATED_SUCCESS,
            data: result,
          });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.deleteCategory = async (req, res) => {
  try {
    let { id } = req.body;
    let { userId } = req.user;
    shop_categories
      .findOne({
        where: {
          id: id,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let Data = {
            status: 0,
            userId: userId,
          };
          result.update(Data);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.CATEGORY_DELETED_SUCCESS,
            data: result,
          });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.getAllCategory = async (req, res) => {
  try {
    let data = await shop_categories.findAll({
      where: {
        status: true,
      },
    });
    let massage =
      data.length > 0
        ? Constant.CATEGORY_RETRIEVE_SUCCESS
        : Constant.NO_DATA_FOUND;
    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.add = async (req, res) => {
  try {
    let { name, categoryId,businessName,area,since,img,number,city,pincode, } =
      req.body;
    let { userId } = req.user;
    
    let shopData = {
      name: name,
      categoryId: categoryId,
      userId: userId,
      businessName:businessName,
      area:area,
      since:since,
      number:number,
      city:city,
      pincode:pincode
    };
    shop
      .create(shopData)
      .then(async (result) => {
        if (req.files) {
          img = await utility.fileupload(req.files);
          let shopData = {
            img: img,
          };
          result.update(shopData);
        }

        return res.status(Constant.SUCCESS_CODE).json({
          code: Constant.SUCCESS_CODE,
          massage: Constant.SHOP_SAVE_SUCCESS,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: result,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.edit = async (req, res) => {
  try {
    let { id, name, categoryId,businessName,area,since,img,number,city,pincode, } =
      req.body;
    let { userId } = req.user;
    shop
      .findOne({
        where: {
          id: id,
        },
      })
      .then(async (result) => {
        if (result) {
          let ProductData = {
            name: name,
            categoryId: categoryId,
            userId: userId,
            businessName:businessName,
            area:area,
            since:since,
            number:number,
            city:city,
            pincode:pincode
          };

          result.update(ProductData);
          if (req.files) {
            img = await utility.fileupload(req.files);
            let shopData = {
              img: img,
            };
            result.update(shopData);
          }
          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.SHOP_UPDATE_SUCCESS,
            data: result,
          });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: null,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.delete = async (req, res) => {
  try {
    let { id } = req.body;
    let {userId} = req.user
    shop
      .findOne({
        where: {
          id: id,
          userId:userId,
          status: 1,
        },
      })
      .then(async (result) => {
        if (result) {
          let Data = {
            status: 0,
          };
          result.update(Data);

          return res.status(Constant.SUCCESS_CODE).json({
            code: Constant.SUCCESS_CODE,
            massage: Constant.SHOP_DELETED_SUCCESS,
            data: result,
          });
        } else {
          return res.status(Constant.ERROR_CODE).json({
            code: Constant.ERROR_CODE,
            massage: Constant.SOMETHING_WENT_WRONG,
            data: result,
          });
        }
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.getShop = async (req, res) => {
  try {
    let data = await shop.findAll({
      where: {
        status: true,
      },
      include: [
        {
          model: shop_categories,
        },
      ],
    });
    let massage =
      data.length > 0
        ? Constant.SHOP_RETRIEVE_SUCCESS
        : Constant.NO_DATA_FOUND;
    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.getShopByCategory = async (req, res) => {
  try {
    let { name } = req.body;
    let data = await shop_categories.findOne({
      where: {
        status: true,
        [Op.or]: [
          {
            name: name,
          },
        ],
      },
      include: [
        {
          model: shop,
          where: {
            status: true,
          },
        },
      ],
    });
    let massage = data
      ? Constant.SHOP_RETRIEVE_SUCCESS
      : Constant.NO_DATA_FOUND;
    return res.status(Constant.SUCCESS_CODE).json({
      code: Constant.SUCCESS_CODE,
      massage: massage,
      data: data,
    });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

categories.getShopByBusinessName = async (req, res) => {
  try {
    let { businessName } = req.body;
    shop
      .findOne({
        where: {
          businessName: businessName,
          status: true,
        },
        include: [
          {
            model: shop_categories,
          },
        ],
      })
      .then(async (result) => {
        let massage = result
          ? Constant.SHOP_RETRIEVE_SUCCESS
          : Constant.NO_DATA_FOUND;
        return res.status(Constant.SUCCESS_CODE).json({
          code: Constant.SUCCESS_CODE,
          massage: massage,
          data: result,
        });
      })
      .catch((error) => {
        return res.status(Constant.ERROR_CODE).json({
          code: Constant.ERROR_CODE,
          massage: Constant.SOMETHING_WENT_WRONG,
          data: error,
        });
      });
  } catch (error) {
    return res.status(Constant.ERROR_CODE).json({
      code: Constant.ERROR_CODE,
      massage: Constant.SOMETHING_WENT_WRONG,
      data: error,
    });
  }
};

module.exports = categories;
