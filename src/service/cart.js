const cartDAO = require('../dao/cart');

class CartService 
{
  async getCarts(id)
  {
    return await cartDAO.getCarts(id);
  }

  async getCartUser(user_id)
  {
    return await cartDAO.getCartUser(user_id);
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
