const cartService = require('../service/cart');

class cartController {

  async getCarts(req,res)
  {
    try{
      const carts = await cartService.getCarts();
      res.status(201).json(carts);
    }

    catch(err){
      console.error(err);
    }

  }
  
  async getOneCart(req,res)
  {
    try{
      const cart = await cartService.getOneCart(req.params.id);
      res.status(201).json(cart);
    }

    catch(err){
      console.error(err);
    }

  }

  async createCart(req,res) {
    try {
      const id = await cartService.createCart(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteCart(req,res) {

    try{
      const id=await cartService.deleteCart(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateCart(req,res) 
  {
    try{
      const id = await cartService.updateCart(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}

module.exports = new cartController();
