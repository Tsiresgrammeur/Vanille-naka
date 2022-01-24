const db= require('../../db/db');

class categoryDAO {

  async getCategories()
  {
    return await db.select().table('category');
  }

  async getOneCategory(id)
  {
    return await db('category').where('id',id).first();
  }

  async createCategory(category_name)
  {
    console.log(category_name)
    const [id] = await db('category').insert({
      category_name: category_name
    }).returning('id');

    return id;
  }

  async deleteCategory(id)
  {
   return await db('category').where('id',id).del();
  }

  async updateCategory(id,name)
  {
     return db('category').where({ id: id}).update({
      category_name:name
    });
  }

}

module.exports = new categoryDAO();
