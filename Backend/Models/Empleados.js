const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Empleado = sequelize.define('empleado', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  sexo: { type: DataTypes.CHAR(1), allowNull: false },
  area_id: { type: DataTypes.INTEGER, allowNull: false },
  boletin: { type: DataTypes.BOOLEAN, allowNull: true },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
});

module.exports = Empleado;