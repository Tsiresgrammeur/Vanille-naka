const userService = require('../service/user');

class UserController {
  async getUsers(req,res)
  {
    try{
      const numMat = await userService.getUsers();
      res.status(201).json(numMat);
    }

    catch(err){
      console.error(err);
    }

  }

  async createUser(req,res) {
    try {
      const id = await userService.createUser(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteUser(req,res) {

    try{
      const id=await userService.deleteUser(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateUser(req,res) 
  {
    try{
      const id = await userService.updateUser(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}

module.exports = new UserController();
