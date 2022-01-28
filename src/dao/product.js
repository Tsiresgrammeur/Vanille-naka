const db= require('../../db/db');

class productDAO {

  async getProducts(index)
  {
    if(index)
      return await db.select('product.id','product.product_name','product.description','product.price','product.quantity','product.category_id','category.category_name').from('product').innerJoin('category','category_id','category.id').where('category_id',index);

    return await db.select('product.id','product.product_name','product.description','product.price','product.quantity','product.category_id','category.category_name').from('product').innerJoin('category','category_id','category.id');

  }

  async getOneProduct(id)
  {
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
