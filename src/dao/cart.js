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

  async createCart(order)
  {
    const [id] = await db('cart').insert({
      order: JSON.stringify(order)
    }).returning('id');

    return id;
  }

  async deleteCart(id)
  {
   return await db('cart').where('id',id).del();
  }

  async updateCart(id,order)
  {
     return db('cart').where({ id: id}).update({
      order: JSON.stringify(order)
    });
  }

}

module.exports = new cartDAO();
