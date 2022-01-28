
const productService = require('../service/product');

class productController {

  async getProducts(req,res)
  {
    try{
      const products = await productService.getProducts(req.params.index);
      res.status(201).json(products);
    }

    catch(err){
      console.error(err);
    }

  }

  async getOneProduct(req,res)
  {
    try{
      const product = await productService.getOneProduct(req.params.id);
      res.status(201).json(product);
    }

    catch(err){
      console.error(err);
    }

  }

  async createProduct(req,res) {
    try {
      const id = await productService.createProduct(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteProduct(req,res) {

    try{
      const id=await productService.deleteProduct(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateProduct(req,res) 
  {
    try{
      const id = await productService.updateProduct(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}

module.exports = new productController();
