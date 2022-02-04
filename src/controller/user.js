const userService = require('../service/user');
const SECRET='any secrets';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

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


  async sendPassword(req,res) {
    const user= await userService.getOneUser(req.body.email);
    const generatedPassword = user.password.substring(10,19);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jeremybuendia29@gmail.com',
        pass: '1836547290'
      }
    });

    var mailOptions = {
      from: 'jeremybuendia29@gmail.com',
      to: req.body.email,
      subject: 'Password recovery',
      html: '<b>'+generatedPassword+'</b>'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        res.status(201).json('Email sent: ' + info.response);
      }
    });
  }

  async changePassword(req,res)
  {
    const user= await userService.getOneUser(req.body.email);
    const generatedCode = user.password.substring(10,19);
    const validPassword= req.body.code == generatedCode;
    if(validPassword)
    {
      user.password = req.body.new_password;
      try{
        const id = await userService.updateUser(user.id,user);
        if(id)
          res.status(201).json({success: true});
      }

      catch(err){
        console.error(err);
      }

    }
    else
    {
      res.status(409).json({success: false, message:"The code you enterd is false"});
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

  validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // console.log(emailPattern.test(elementValue));
    return emailPattern.test(elementValue);
  }

  createUser = async (req,res) => {
    const right_format = this.validateEmail(req.body.email);
    if(req.body.last_name != "")
    {

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
    else
    {
       res.status(409).json({ success:false, message: 'Last name must not be empty' }) 
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
