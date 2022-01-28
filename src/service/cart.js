const cartDAO = require('../dao/cart');

class CartService 
{
  async getCarts()
  {
    return await cartDAO.getCarts();
  }

  async getOneCart(id)
  {
    return await cartDAO.getOneCart(id);
  }

  async createCart(cart)
  {
    const { order, user_id, status }= cart;
    return await cartDAO.createCart(order, user_id, status);
  }

  deleteCart(id)
  {
    return cartDAO.deleteCart(id);
  }

  updateCart(id,cart)
  {
    const { order, user_id, status }= cart;
    return cartDAO.updateCart(id,order, user_id, status);
  }
}

module.exports = new CartService();
