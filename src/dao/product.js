const db= require('../../db/db');
const sheetService = require('../service/stock_sheet');

class productDAO {

  getProducts = async (index) => {
    let products,totalIn=0,totalOut=0;
    var sheets;
    if(index)
    products = await db.select('product.id','product.product_name','product.description','product.price','product.quantity','product.category_id','category.category_name').from('product').innerJoin('category','category_id','category.id').where('category_id',index);
    products =await db.select('product.id','product.product_name','product.description','product.price','product.quantity','product.category_id','category.category_name').from('product').innerJoin('category','category_id','category.id');
    products.forEach(async (product) => {
      sheets = await sheetService.getProduct(product.id);
      if(sheets)
      {
        sheets.forEach((sheet) => {
          if(sheet.operation == "in")
            totalIn += sheet.quantity 
          else if(sheet.operation == "out")
            totalOut += sheet.quantity 
        })
      }

      product.quantity=totalIn - totalOut;
      const updated = await this.updateProduct(
      product.id,
      product.product_name,
      product.description,
      product.price,
      product.category_id, 
      product.quantity);

      totalIn=0;
      totalOut = 0;
    });


    return products;

}


 getOneProduct = async (id) => {
  const products = await this.getProducts();
  return await db('product').where('id',id).first();
}

async createProduct(product_name,description,price,category_id,quantity)
{
  const [id] = await db('product').insert({
    product_name,
    description,
    price,
    category_id,
    quantity
  }).returning('id');

  return id;
}

async deleteProduct(id)
{
  return await db('product').where('id',id).del();
}

async updateProduct(id,product_name,description,price,category_id,quantity)
{
  return db('product').where({ id: id}).update({
    product_name,
    description,
    price,
    category_id,
    quantity
  });
}

}

module.exports = new productDAO();
