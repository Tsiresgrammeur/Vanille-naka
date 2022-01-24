const express=require('express')
const userController=require('../controller/user');
const categoryController=require('../controller/category');
const productController=require('../controller/product');
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


router.get('/api/product/',productController.getProducts);
router.get('/api/product/:id',productController.getOneProduct);
router.post('/api/product/',productController.createProduct);
router.delete('/api/product/:id',productController.deleteProduct);
//router.put('/api/product/:id',productController.updateProduct)
module.exports=router;
