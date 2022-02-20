const db= require('../../db/db');
const sheetService = require('../service/stock_sheet');
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
    const stock_sheet= {};
    stock_sheet.sheet_date=new Date();
    stock_sheet.operation='out';
    stock_sheet.quantity=quantity;
    stock_sheet.product_id=product_id;
    const sheet=sheetService.createSheet(stock_sheet);

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

  async bestSale()
  {
    return db.select('product_id').from('sale').count('*').groupBy('product_id').orderBy('count','desc').limit('5');
  }

}

module.exports = new saleDAO();
