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
    console.log('ity dia service')
    return await productDAO.getOneProduct(id);
  }

  async createProduct(product)
  {
    const {product_name,description,price,category_id,quantity, image_1,image_2,image_3} = product;
    const product_id=await productDAO.createProduct(product_name,description,price,category_id,quantity);
    let image_name;
    let buff;
    let i=1;

    if(product_id)
    {
      if(image_1.split(',')[1] != undefined)
      {
        buff=Buffer.from(image_1.split(',')[1], 'base64');
        image_name=path_image+"/img_"+product_id.id+"_"+i+".jpeg"
        fs.writeFileSync(image_name,buff);
      }
      if(image_2.split(',')[1] != undefined)
      {
        buff=Buffer.from(image_2.split(',')[1], 'base64');
        i=2;
        image_name=path_image+"/img_"+product_id.id+"_"+i+".jpeg"
        fs.writeFileSync(image_name,buff)
      }
      if(image_3.split(',')[1] != undefined)
      {
        buff=Buffer.from(image_3.split(',')[1], 'base64');
        i=3;
        image_name=path_image+"/img_"+product_id.id+"_"+i+".jpeg"
        fs.writeFileSync(image_name,buff)
      }
    }
    return product_id;
  }

  deleteProduct(id)
  {
    let image_name;
    const delete_status= productDAO.deleteProduct(id);
    if(delete_status)
    {
      for(let i=1; i < 4; i++)
      {
        image_name=path_image+"/img_"+id+"_"+i+".jpeg"
        fs.unlinkSync(image_name);
      }
    }

    return delete_status;
  }

  updateProduct(id,product)
  {
    let image_name;
    let buff;
    let i=1;
    const {product_name,description,price,category_id,quantity,image_1,image_2,image_3} = product;
    if(image_1.split(',')[1] != undefined)
    {
      buff=Buffer.from(image_1.split(',')[1], 'base64');
      image_name=path_image+"/img_"+id+"_"+i+".jpeg"
      fs.writeFileSync(image_name,buff);
    }
    if(image_2.split(',')[1] != undefined)
    {
      buff=Buffer.from(image_2.split(',')[1], 'base64');
      i=2;
      image_name=path_image+"/img_"+id+"_"+i+".jpeg"
      fs.writeFileSync(image_name,buff)
    }
    if(image_3.split(',')[1] != undefined)
    {
      buff=Buffer.from(image_3.split(',')[1], 'base64');
      i=3;
      image_name=path_image+"/img_"+id+"_"+i+".jpeg"
      fs.writeFileSync(image_name,buff)
    }
    return productDAO.updateProduct(id,product_name,description,price,category_id,quantity);
  }
}

module.exports = new ProductService();
