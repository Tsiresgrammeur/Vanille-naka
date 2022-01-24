const db= require('../../db/db');

class saleDAO {

  async getSales()
  {
    return await db('sale').innerJoin('user','user_id','user.id').innerJoin('product','product_id','product.id');
  }

  async getOneSale(id)
  {
    return await db('sale').where('id',id).first();
  }

  async createSale(user_id, product_id, sale_date,quantity,status)
  {
    const [id] = await db('sale').insert({
      user_id,
      product_id,
      sale_date,
      quantity,
      status
    }).returning('id');

    return id;
  }

  async deleteSale(id)
  {
   return await db('sale').where('id',id).del();
  }

  async updateSale(id,user_id, product_id, sale_date,quantity,status)
  {
     return db('sale').where({ id: id}).update({
      user_id,
      product_id,
      sale_date,
      quantity,
      status
    });
  }

}

module.exports = new saleDAO();
