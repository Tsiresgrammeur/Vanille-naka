const productDAO = require('../dao/product');

class ProductService 
{
  async getProducts(index)
  {
    return await productDAO.getProducts(index);
  }

  async getOneProduct(id)
  {
    return await productDAO.getOneProduct(id);
  }

  async createProduct(product)
  {
    const {product_name,description,price,category_id} = product;
    return await productDAO.createProduct(product_name,description,price,category_id);
  }

  deleteProduct(id)
  {
    return productDAO.deleteProduct(id);
  }

  updateProduct(id,product_name,description,price,category_id)
  {
    return productDAO.updateProduct(id,product_name,description,price,category_id);
  }
}

module.exports = new ProductService();
