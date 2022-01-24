const express=require('express')
const userController=require('../controller/user');
const router = express.Router();

router.get('/api/user/',userController.getUsers);
router.get('/api/user/:id',userController.getOneUser);
router.post('/api/user/',userController.createUser);
router.delete('/api/user/:id',userController.deleteUser);
router.put('/api/user/:id',userController.updateUser)

module.exports=router;
