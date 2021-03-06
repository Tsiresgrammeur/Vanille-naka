const db= require('../../db/db');

class productDAO {

  getProducts = async (index) => {
    index=parseInt(index)
    if(index)
    {
      return await db.select('product.id',
        'product.product_name',
        'product.description',
        'product.price',
        'product.category_id',
        'category.category_name')
        .from('product')
        .innerJoin('category','category_id','category.id')
        .where('category_id','=',index);

    }
   return await db.select('product.id',
      'product.product_name',
      'product.description',
      'product.price',
      'product.category_id',
      'category.category_name')
      .from('product')
      .innerJoin('category','category_id','category.id');


}


 getOneProduct = async (id) => {
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
