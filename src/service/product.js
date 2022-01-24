const productDAO = require('../dao/product');

class ProductService 
{
  async getProducts(index)
  {
    return await productDAO.getProducts(index);
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

  updateProduct(id,product)
  {
    const {product_name,description,price,category_id} = product;
    return productDAO.updateProduct(id,product_name,description,price,category_id);
  }
}

module.exports = new ProductService();
