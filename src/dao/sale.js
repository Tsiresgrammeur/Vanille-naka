const db= require('../../db/db');
//const dateFormat= require('dateFormat');

class saleDAO {

  async getSalesFiltered(firstDate, secondDate)
  {
    if(firstDate && secondDate)
    {
      return await db.select(
        'sale.id','user_id','user.first_name',
        'user.last_name','user.email',
        'user.address','user.country',
        'user.numberPhone','product_id','product.product_name','price','sale_date','sale.quantity').
        from('sale')
        .innerJoin('user','user_id','user.id')
        .innerJoin('product','product_id','product.id')
        .whereBetween('sale_date',[firstDate, secondDate]);
    }
    return await db.select(
      'sale.id','user_id','user.first_name',
      'user.last_name','user.email',
      'user.address','user.country',
      'user.numberPhone','product_id','product.product_name','price','sale_date','sale.quantity').
      from('sale')
      .innerJoin('user','user_id','user.id')
      .innerJoin('product','product_id','product.id');

  }

  async createSale(user_id, product_id, sale_date,quantity)
  {
    //const date_formated=new Date(sale_date).toIsoString().replace('T',)
    const [id] = await db('sale').insert({
      user_id,
      product_id,
      sale_date,
      quantity
    }).returning('id');

    return id;
  }

  async deleteSale(id)
  {
   return await db('sale').where('id',id).del();
  }

  async updateSale(id,user_id, product_id, sale_date,quantity)
  {
     return db('sale').where({ id: id}).update({
      user_id,
      product_id,
      sale_date,
      quantity
    });
  }

}

module.exports = new saleDAO();
