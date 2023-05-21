var express = require('express')
var router = express.Router()
var shop = require('../controller/shop_ctrl')
const middileware = require('../middlerware')

router.post('/addCategory', middileware.checkAuthentication, shop.addCategory);
router.put('/editCategory', middileware.checkAuthentication, shop.editCategory);
router.delete('/deleteCategory', middileware.checkAuthentication, shop.deleteCategory);
router.get('/getAllCategory', shop.getAllCategory);

router.get('/get', shop.getShop);
router.post('/add', middileware.checkAuthentication, shop.add);
router.put('/edit', middileware.checkAuthentication, shop.edit);
router.delete('/delete', middileware.checkAuthentication, shop.delete);
router.post('/getShopByCategory', shop.getShopByCategory);
router.post('/getShopByBusinessName',shop.getShopByBusinessName);


module.exports = router;