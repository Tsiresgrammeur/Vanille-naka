const sheetService = require('../service/stock_sheet');

class sheetController {

  async getSheets(req,res)
  {
    try{
      const sheets = await sheetService.getSheets(req.params.index);
      res.status(201).json(sheets);
    }

    catch(err){
      console.error(err);
    }

  }
  
  async createSheet(req,res) {
    try {
      const id = await sheetService.createSheet(req.body);
      if(id)
      res.status(201).json({success: true}); 
    }
    catch(err){
      console.error(err);
    }
  }

  async deleteSheet(req,res) {

    try{
      const id=await sheetService.deleteSheet(req.params.id);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }

  async updateSheet(req,res) 
  {
    try{
      const id = await sheetService.updateSheet(req.params.id,req.body);
      if(id)
      res.status(201).json({success: true});
    }

    catch(err){
      console.error(err);
    }
  }



}

module.exports = new sheetController();
