const express=require('express')
const userController=require('../controller/user');
const categoryController=require('../controller/category');
const productController=require('../controller/product');
const saleController=require('../controller/sale');
const sheetController=require('../controller/stock_sheet');
const router = express.Router();

router.get('/api/user/',userController.getUsers);
router.get('/api/user/:id',userController.getOneUser);
router.post('/api/user/',userController.createUser);
router.delete('/api/user/:id',userController.deleteUser);
router.put('/api/user/:id',userController.updateUser)


router.get('/api/category/',categoryController.getCategories);
router.get('/api/category/:id',categoryController.getOneCategory);
router.post('/api/category/',categoryController.createCategory);
router.delete('/api/category/:id',categoryController.deleteCategory);
router.put('/api/category/:id',categoryController.updateCategory)


router.get('/api/product/:index?',productController.getProducts);
router.post('/api/product/',productController.createProduct);
router.delete('/api/product/:id',productController.deleteProduct);
router.put('/api/product/:id',productController.updateProduct)

router.get('/api/sale/',saleController.getSales);
router.post('/api/sale/',saleController.createSale);
router.delete('/api/sale/:id',saleController.deleteSale);
router.put('/api/sale/:id',saleController.updateSale)

router.get('/api/sheet/',sheetController.getSheets);
router.post('/api/sheet/',sheetController.createSheet);
router.delete('/api/sheet/:id',sheetController.deleteSheet);
router.put('/api/sheet/:id',sheetController.updateSheet)


module.exports=router;
