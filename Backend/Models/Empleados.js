// backend/models/Empleado.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Asegúrate de importar sequelize desde db.js

const Empleado = sequelize.define('empleado', {
  // Definición explícita del ID (opcional, Sequelize lo añade por defecto,
  // pero controlarlo te da más visibilidad)
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // <--- RECOMENDACIÓN: Asegura que el email sea único
    validate: {
      isEmail: true, // <--- RECOMENDACIÓN: Valida que sea un formato de email válido
    }
  },
  sexo: {
    type: DataTypes.CHAR(1), // 'M' para masculino, 'F' para femenino
    allowNull: false,
    validate: {
      isIn: [['M', 'F']], // <--- RECOMENDACIÓN: Valida que el valor sea 'M' o 'F'
    }
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Puedes agregar una foreign key aquí si tienes un modelo de 'Area'
    // references: {
    //   model: 'areas', // Asume que tienes un modelo Area con tabla 'areas'
    //   key: 'id'
    // }
  },
  boletin: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false, // <--- RECOMENDACIÓN: Valor por defecto si no se proporciona
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'empleados', 
  timestamps: true 
});

module.exports = Empleado;