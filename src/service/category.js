const categoryDAO = require('../dao/category');

class CategoryService 
{
  async getCategories()
  {
    return await categoryDAO.getCategories();
  }

  async getOneCategory(id)
  {
    return await categoryDAO.getOneCategory(id);
  }

  async createCategory(name)
  {
    return await categoryDAO.createCategory(name.category_name);
  }

  deleteCategory(id)
  {
    return categoryDAO.deleteCategory(id);
  }

  updateCategory(id,category_name)
  {
    return categoryDAO.updateCategory(id,category_name.category_name);
  }
}

module.exports = new CategoryService();
