const fs=require('fs')
const express=require('express');
const bodyparser=require('body-parser');
const path=require('path');
var path_image=path.relative('../../','../../public/image/product/');

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
    const {product_name,description,price,category_id,quantity, image_1} = product;
    const product_id=await productDAO.createProduct(product_name,description,price,category_id,quantity);
    var image_1_created=path_image+"/img_"+product_id.id+".jpg";
    console.log(image_1)
    if(product_id)
    {
      let buff=Buffer.from(image_1, 'base64');
      fs.writeFileSync(image_1_created,buff)
    }
    return product_id;
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
