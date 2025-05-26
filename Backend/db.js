const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('empleados_db', 'root', 'root', { 
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida exitosamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
    process.exit(1);
  }
}
async function syncModels() {
  try {

    require('./models/Empleado');
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('Error al sincronizar los modelos:', error);
    process.exit(1);
  }
}

module.exports = { sequelize, connectDB, syncModels };