'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Users', [{
      firstName: 'John Doe',
      lastName: "Mr",
      email: 'examp@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      firstName: 'John Dark',
      lastName: "Mr",
      email: 'dark@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
