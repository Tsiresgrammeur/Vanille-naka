const db= require('../../db/db');
const saleDAO = require('../dao/sale');

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
      status,
      cart_date: new Date()
    }).returning('id');


    console.log(typeof(order))

    order.forEach((value) => {
      const sale_id= saleDAO.createSale(user_id, value.product_id,new Date(), value.quantity);
    })
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
