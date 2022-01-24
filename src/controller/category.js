const categoryService = require('../service/category');

class categoryController {

  async getCategories(req,res)
  {
    try{
      const categories = await categoryService.getCategories();
      res.status(201).json(categories);
    }

    catch(err){
      console.error(err);
    }

  }
  
  async getOneCategory(req,res)
  {
    try{
      const category = await categoryService.getOneCategory(req.params.id);
      res.status(201).json(category);
    }

    catch(err){
      console.error(err);
    }

  }

  async createCategory(req,res) {
    try {
      const id = await categoryService.createCategory(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteCategory(req,res) {

    try{
      const id=await categoryService.deleteCategory(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateCategory(req,res) 
  {
    try{
      const id = await categoryService.updateCategory(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}

module.exports = new categoryController();
