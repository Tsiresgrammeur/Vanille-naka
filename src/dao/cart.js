const db= require('../../db/db');

class cartDAO {

  async getCarts()
  {
    return await db.select().table('cart');
  }

  async getOneCart(id)
  {
    return await db('cart').where('id',id).first();
  }

  async createCart(order,user_id,status)
  {
    const [id] = await db('cart').insert({
      order: JSON.stringify(order),
      user_id,
      status
    }).returning('id');

    //order.foreach((value) => {
    //  const [sale_id]= await createSale(user_id, value.product_id)

    //})
    return id;
  }

  async deleteCart(id)
  {
   return await db('cart').where('id',id).del();
  }

  async updateCart(id,order,user_id, status)
  {
     return db('cart').where({ id: id}).update({
      order: JSON.stringify(order),
      user_id,
      status
    });
  }

}

module.exports = new cartDAO();
