const db= require('../../db/db');

class productDAO {

  async getProducts(index)
  {
    if(index)
    return await db('product').innerJoin('category','category_id','category.id').where('category_id',index);

    return await db('product').innerJoin('category','category_id','category.id');

  }

  async getProductFiltered(index)
  {
    return await db('product').where('category_id',index);
  }

  async getOneProduct(id)
  {
    return await db('product').where('id',id).first();
  }

  async createProduct(product_name,description,price,category_id)
  {
    const [id] = await db('product').insert({
      product_name,
      description,
      price,
      category_id
    }).returning('id');

    return id;
  }

  async deleteProduct(id)
  {
   return await db('product').where('id',id).del();
  }

  async updateProduct(id,product_name,description,price,category_id)
  {
     return db('product').where({ id: id}).update({
      product_name,
      description,
      price,
      category_id
    });
  }

}

module.exports = new productDAO();
