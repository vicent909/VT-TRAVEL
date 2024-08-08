'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const data = require('../datas/image.json').map((e) => {
    return {
      ...e,
      createdAt: new Date(),
      updatedAt: new Date()
    }
   });

   await queryInterface.bulkInsert('Images', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Images', null, {
      truncate:true,
        cascade: true,
        restartIdentity: true
    });
  }
};