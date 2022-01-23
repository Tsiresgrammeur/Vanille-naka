const db= require('../../db/db');
const bcrypt=require('bcrypt');
const saltRounds = 10;

class userDAO {

  async getUser(email)
  {
    return db('user').where('email', email).first();
  }

  async createUser(first_name, last_name,email, password, address,country, role, numberPhone)
  {
    console.log('hai')
    const hashed = await bcrypt.hash(password, saltRounds);
    const [id] = await db('user').insert({
      first_name,
      last_name,
      email,
      password: hashed,
      address,
      country,
      role,
      numberPhone
    }).returning('id');

    return id;
  }

  async deleteUser(id)
  {
   return db('user').where('id',id).del();
  }

  async updateUser(id, first_name, last_name,email, password, address,country, role, numberPhone)
  {
     const hashed = await bcrypt.hash(password, saltRounds);
     return db('user').where({ id: id}).update({
      num_mat: numMat,
      first_name,
      last_name,
      email,
      password: hashed,
      address,
      country,
      role,
      numberPhone
    });
  }

}

module.exports = new userDAO();