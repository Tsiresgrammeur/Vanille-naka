const userDAO = require('../dao/user');

class UserService 
{
  getUser(id)
  {
    return userDAO.getUser(id);
  }
  async createUser(user)
  {
    const { firstName,lastName,email,password,address,country,role,numberPhone} = user;
    return await userDAO.createUser(firstName,lastName,email,password,address,country,role,numberPhone);
  }

  deleteUser(idUser)
  {
    const numMat = idUser;
    return userDAO.deleteUser(numMat);
  }

  updateUser(user)
  {
    const { firstName,lastName,email,password,address,country,role,numberPhone} = user;
    return userDAO.updateUser(id,firstName,lastName,email,password,address,country,role,numberPhone);
  }
}

module.exports = new UserService();
