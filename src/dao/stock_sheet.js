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

  async getProduct(id)
  {
    return await db.select('operation','product_id','quantity').from('stock_sheet').where('product_id', id);
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



    return id;
  }

  async deleteSheet(id)
  {
    const product = await db.select('product_id').from('stock_sheet').where('id',id).first();
    const productGot= await productService.getOneProduct(product.product_id);
    const {product_name,description,price,category_id} = productGot;
    const productGot_id = productGot.id;
    const sheet_to_delete = await db('stock_sheet').where('id',id).first();
    let quantity_updated;
    if(sheet_to_delete.operation == 'in')
    {
      quantity_updated = productGot.quantity - sheet_to_delete.quantity;
    } 

    else if(sheet_to_delete.operation == 'out')
    {
      quantity_updated = productGot.quantity + sheet_to_delete.quantity;
    }

    productGot.quantity= quantity_updated;
    productGot.image_1="";
    productGot.image_2="";
    productGot.image_3="";
    const updated = await productService.updateProduct(productGot_id,productGot);
    return await db('stock_sheet').where('id',id).del();
  }

  async updateSheet(id,sheet_date, operation, quantity,product_id)
  {
   // const current_sheet= await db('stock_sheet').where('id',id).first();
   // if(current_sheet.product_id == product_id)
   // {
   //   const product= await productService.getOneProduct(product.product_id);
   // }
    return db('stock_sheet').where({ id: id}).update({
      sheet_date,
      operation,
      quantity,
      product_id
    });
  }

}

module.exports = new sheetDAO();
