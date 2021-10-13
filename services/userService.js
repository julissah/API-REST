const faker = require('faker');

class UsersService {
  constructor() {
    this.users = []
    this.generate();
  }

  generate() {
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
  };

  create() {

  }

  find() {
    return this.users;
  }

  findOne(id) {
    return this.users.find(item => item.id == id);
  }

  update() {

  }

  delete() {

  }

}

module.exports = UsersService;
