const db= require('../../db/db');

class sheetDAO {

  async getSheets(operation)
  {
    if(operation)
      return await db.select(
        'stock_sheet.id'
        'sheet_date','operation',
        'quantity','product_id',
        'product.product_name'
      )
        .from('stock_sheet').innerJoin(
          'product','product_id','product.id'
        )
        .where('operation','=',operation);
      return await db.select(
        'stock_sheet.id'
        'sheet_date','operation',
        'quantity','product_id',
        'product.product_name'
      )
        .from('stock_sheet').innerJoin(
          'product','product_id','product.id'
        );

  }

  async createSheet(sheet_date, operation, quantity,product_id)
  {
    const [id] = await db('stock_sheet').insert({
      sheet_date,
      operation,
      quantity,
      product_id
    }).returning('id');

    return id;
  }

  async deleteSheet(id)
  {
   return await db('stock_sheet').where('id',id).del();
  }

  async updateSheet(id,sheet_date, operation, quantity,product_id)
  {
     return db('stock_sheet').where({ id: id}).update({
      sheet_date,
      operation,
      quantity,
      product_id
    });
  }

}

module.exports = new sheetDAO();
