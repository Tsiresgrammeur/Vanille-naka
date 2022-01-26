const saleService = require('../service/sale');

class saleController {

  async getSales(req,res)
  {
    try{
      const sales = await saleService.getSales(req.params.index);
      res.status(201).json(sales);
    }

    catch(err){
      console.error(err);
    }

  }

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



}

module.exports = new saleController();
