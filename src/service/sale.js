const saleDAO = require('../dao/sale');

class SaleService 
{
  async getSales(index)
  {
    return await saleDAO.getSales(index);
  }

  async getOneSale(id)
  {
    return await saleDAO.getOneSale(id);
  }


  async getSalesFiltered(criteria)
  {
    console.log('bogod')
    const { firstDate, secondDate } = criteria;
    return await saleDAO.getSalesFiltered(firstDate, secondDate);
  }

  async createSale(sale)
  {
    const {user_id,product_id,sale_date,quantity,status} = sale;
    return await saleDAO.createSale(user_id,product_id,sale_date,quantity,status);
  }

  deleteSale(id)
  {
    return saleDAO.deleteSale(id);
  }

  updateSale(id,sale)
  {
    const { user_id,product_id,sale_date,quantity,status } = sale;
    return saleDAO.updateSale(id,user_id,product_id,sale_date,quantity,status);
  }
}

module.exports = new SaleService();
