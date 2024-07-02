

module.exports = {

    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            email: 'admin@gmail.com',
            password: '123456',
            firstName: 'HoiDanIt',
            lastName: 'Eric',
            address: 'USA',
            gender: 1,
            roleId: 'ROLE',
            phonenumber: '0912366666',
            positionId: 'professtional',
            image: 'NULL',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: async (queryInterface, Sequelize) => {
        /* Add comands to revert seed Headers. */
        return queryInterface.bulkDelete('Users', null, {});
    }
};