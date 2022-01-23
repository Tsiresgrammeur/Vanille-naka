const userDAO = require('../dao/user');

class UserService 
{
  getUsers()
  {
    return userDAO.getUsers();
  }
  async createUser(user)
  {
    const { firstName,lastName,email,password,address,country,role,numberPhone} = user;
    return await userDAO.createUser(firstName,lastName,email,password,address,country,role,numberPhone);
  }

  deleteUser(idUser)
  {
    return userDAO.deleteUser(idUser);
  }

  updateUser(id,user)
  {
    const { firstName,lastName,email,password,address,country,role,numberPhone} = user;
    return userDAO.updateUser(id,firstName,lastName,email,password,address,country,role,numberPhone);
  }
}

module.exports = new UserService();
