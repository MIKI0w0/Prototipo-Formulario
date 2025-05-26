import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Notificaciones from './Notificaciones';
import './ListaEmpleados.css'; 

function ListaEmpleados({ onEdit, onRefresh }) {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const cargarEmpleados = async () => {
    setError('');
    setMensaje('');
    try {
      const res = await axios.get('http://localhost:3000/empleados');
      setEmpleados(res.data);
    } catch (err) {
      console.error('Error al cargar empleados:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Error al cargar empleados. Intente de nuevo más tarde.');
      }
    }
  };

  useEffect(() => {
    cargarEmpleados();
  }, [onRefresh]); 

  const eliminarEmpleado = async (id) => {
    setError('');
    setMensaje('');
    if (window.confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      try {
        const res = await axios.delete(`http://localhost:3000/empleados/${id}`);
        setMensaje(res.data.mensaje || "Empleado eliminado con éxito.");
        cargarEmpleados(); 
      } catch (err) {
        console.error('Error al eliminar:', err);
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('Error al eliminar empleado.');
        }
      }
    }
  };

  return (
    <div className="lista-empleados-container">
      <h2>Lista de Empleados</h2>
      <Notificaciones mensaje={mensaje} error={error} />
      {empleados.length === 0 && !error ? (
        <p className="no-empleados-msg">No hay empleados registrados.</p>
      ) : (
        <table className="empleados-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Sexo</th>
              <th>Área ID</th>
              <th>Boletín</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map(emp => (
              <tr key={emp.id}>
                <td>{emp.nombre}</td>
                <td>{emp.email}</td>
                <td>{emp.sexo}</td>
                <td>{emp.area_id}</td>
                <td>{emp.boletin ? 'Sí' : 'No'}</td>
                <td>{emp.descripcion}</td>
                <td>
                  <div className="acciones-buttons">
                    <button
                      onClick={() => onEdit(emp)}
                      className="accion-button edit"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarEmpleado(emp.id)}
                      className="accion-button delete"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaEmpleados;