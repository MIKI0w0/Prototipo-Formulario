const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('empleados_db', 'usuario', 'contraseña', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;