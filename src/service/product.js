const productDAO = require('../dao/product');

class ProductService 
{
  async getProducts(index)
  {
    return await productDAO.getProducts(index);
  }

  async getOneProduct(id)
  {
    return await productDAO.getOneProduct(id)
  }

  async createProduct(product)
  {
    const {product_name,description,price,category_id,quantity} = product;
    return await productDAO.createProduct(product_name,description,price,category_id,quantity);
  }

  deleteProduct(id)
  {
    return productDAO.deleteProduct(id);
  }

  updateProduct(id,product)
  {
    const {product_name,description,price,category_id,quantity} = product;
    return productDAO.updateProduct(id,product_name,description,price,category_id,quantity);
  }
}

module.exports = new ProductService();
