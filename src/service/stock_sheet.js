const sheetDAO = require('../dao/stock_sheet');

class SheetService 
{
  async getSheets(index)
  {
    const { operation } =index;
    return await sheetDAO.getSheets(operation);
  }

  async createSheet(sheet)
  {
    const {sheet_date, operation, quantity,product_id} = sheet;
    return await sheetDAO.createSheet(sheet_date, operation, quantity,product_id);
  }

  deleteSheet(id)
  {
    return sheetDAO.deleteSheet(id);
  }

  updateSheet(id,sheet)
  {
    const { sheet_date, operation, quantity,product_id } = sheet;
    return sheetDAO.updateSheet(id, sheet_date, operation, quantity,product_id );
  }
}

module.exports = new SheetService();
