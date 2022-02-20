const userDAO = require('../dao/user');

class UserService 
{
  getUsers()
  {
    return userDAO.getUsers();
  }

  getOneUser(id)
  {
    return userDAO.getOneUser(id);
  }
  async createUser(user)
  {
    const { first_name,last_name,email,password,address,town,postal_code,country,role,numberPhone} = user;
    return await userDAO.createUser(first_name,last_name,email,password,address,town,postal_code,country,role,numberPhone);
  }

  deleteUser(idUser)
  {
    return userDAO.deleteUser(idUser);
  }

  updateUser(id,user)
  {
    const { first_name,last_name,email,password,address,town,postal_code,country,role,numberPhone} = user;
    return userDAO.updateUser(id,first_name,last_name,email,password,address,town,postal_code,country,role,numberPhone);
  }
}

module.exports = new UserService();
