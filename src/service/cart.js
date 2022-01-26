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

  async createCart(order)
  {
    return await cartDAO.createCart(order);
  }

  deleteCart(id)
  {
    return cartDAO.deleteCart(id);
  }

  updateCart(id,order)
  {
    return cartDAO.updateCart(id,order);
  }
}

module.exports = new CartService();
