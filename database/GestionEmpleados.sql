-- Crear la base de datos (si aún no existe)
CREATE DATABASE GestionEmpleados;
GO

-- Usar la base de datos
USE GestionEmpleados;
GO

-- Crear la tabla 'areas'
CREATE TABLE areas (
 id INT PRIMARY KEY,
 nombre VARCHAR(255) NOT NULL
);
GO

-- Crear la tabla 'roles'
CREATE TABLE roles (
 id INT PRIMARY KEY,
 nombre VARCHAR(255) NOT NULL
);
GO

-- Crear la tabla 'empleados'
CREATE TABLE empleados (
 id INT PRIMARY KEY,
 nombre VARCHAR(255) NOT NULL,
 email VARCHAR(255) NOT NULL,
 sexo CHAR(1) NOT NULL,
 area_id INT NOT NULL,
 boletin INT,
 descripcion TEXT NOT NULL,
 FOREIGN KEY (area_id) REFERENCES areas(id)
);
GO

-- Crear la tabla 'empleado_rol'
CREATE TABLE empleado_rol (
 empleado_id INT NOT NULL,
 rol_id INT NOT NULL,
 PRIMARY KEY (empleado_id, rol_id),
 FOREIGN KEY (empleado_id) REFERENCES empleados(id),
 FOREIGN KEY (rol_id) REFERENCES roles(id)
);
GO