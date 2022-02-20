const saleService = require('../service/sale');

class saleController {

  async getSalesFiltered(req,res)
  {
    try{
      const sales = await saleService.getSalesFiltered(req.body);
      res.status(201).json(sales);
    }

    catch(err){
      console.error(err);
    }

  }
  
  async createSale(req,res) {
    try {
      const id = await saleService.createSale(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteSale(req,res) {

    try{
      const id=await saleService.deleteSale(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateSale(req,res) 
  {
    try{
      const id = await saleService.updateSale(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async bestSale(req, res)
  {
    try{
      const count = await saleService.bestSale();
      if(count)
      res.status(201).json(count);
    }

    catch(err){
      console.error(err);
    }

  }



}

module.exports = new saleController();
