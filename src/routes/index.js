const express=require('express')
const userController=require('../controller/user');
const router = express.Router();

router.get('/api/user/:id',userController.getUser);
router.post('/api/user/',userController.createUser);

module.exports=router;
