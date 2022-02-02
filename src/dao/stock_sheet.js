const db= require('../../db/db');
const productService= require('../service/product');

class sheetDAO {

  async getSheets(operation)
  {
    if(operation)
      return await db.select(
        'stock_sheet.id',
        'sheet_date','operation',
        'stock_sheet.quantity','product_id',
        'product.product_name'
      )
        .from('stock_sheet').innerJoin(
          'product','product_id','product.id'
        )
        .where('operation','=',operation);
      return await db.select(
        'stock_sheet.id',
        'sheet_date','operation',
        'stock_sheet.quantity','product_id',
        'product.product_name'
      )
        .from('stock_sheet').innerJoin(
          'product','product_id','product.id'
        );

  }

  async createSheet(sheet_date, operation, quantity,product_id)
  {
    var quantity_updated;
    const [id] = await db('stock_sheet').insert({
      sheet_date,
      operation,
      quantity,
      product_id
    }).returning('id');

    const productGot= await productService.getOneProduct(product_id);
    const {product_name,description,price,category_id} = productGot;
    const productGot_id = productGot.id;
    if(operation == 'in')
    {
      quantity_updated = productGot.quantity + quantity;
    } 
    else if(operation == 'out')
    {
      quantity_updated = productGot.quantity-quantity;
    }
    productGot.quantity= quantity_updated;
    productGot.image_1="";
    productGot.image_2="";
    productGot.image_3="";
    const updated = await productService.updateProduct(productGot_id,productGot);


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
