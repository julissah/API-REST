const faker = require('faker');

class UsersService {
  constructor() {
    this.users = []
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.gender(),
        jobArea: faker.name.jobArea()
      });
    };
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 5000);
    })
  }

  async findOne(id) {
    const name = this.getTotal();
    return this.users.find(item => item.id == id);
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id == id)
    if (index === -1) {
      throw new Error('user not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id == id)
    if (index === -1) {
      throw new Error('user not found');
    }
    this.users.splice(index, 1);
    return { id }
  }

}

module.exports = UsersService;
