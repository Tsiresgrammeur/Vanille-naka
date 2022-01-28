const userService = require('../service/user');
const SECRET='any secrets';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserController {
  async authenticate(req,res)
  {
    var user= await userService.getOneUser(req.body.email)
    if(!user)
    {
      res.status(401).json({
        error: "No user with that email"
      })
    }

    else
    {
      const validPassword= await bcrypt.compare(req.body.password, user.password)
        if(validPassword)
        {
          return jwt.sign(user, SECRET, (error, token) => {
            res.status(200).json({token})
          })
        }
        else
        {
          return res.status(401).json({success: false,message:'password does not match'})
        }
      }

  }

  async getUsers(req,res)
  {
    try{
      const users = await userService.getUsers();
      res.status(201).json(users);
    }

    catch(err){
      console.error(err);
    }

  }

  async getOneUser(req, res)
  {
    try{
      const user = await userService.getOneUser(req.params.id);
      res.status(201).json(user);
    }

    catch(err){
      console.error(err);
    }
  }

  async createUser(req,res) {
    const right_format=validateEmail(req.body.email);

    if(right_format)
    {
      try {
        const id = await userService.createUser(req.body);
        if(id)
          res.status(201).json({success: true}); 
      }
      catch(err){
        console.error(err);
      }
    }
    else
    {
     res.status(409).json({ success:false, message: 'email format not validated' }) 
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

 function validateEmail(elementValue) {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // console.log(emailPattern.test(elementValue));
  return emailPattern.test(elementValue);
}

module.exports = new UserController();
