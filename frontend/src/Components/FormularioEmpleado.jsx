import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notificaciones from './Notificaciones';
import './FormularioEmpleados.css'; 

const initialState = {
  nombre: '',
  email: '',
  sexo: 'M',
  area_id: '',
  boletin: false,
  descripcion: '',
};

function FormularioEmpleado({ empleadoToEdit, onEmpleadoSaved }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchedAreas = [
      { id: 1, nombre: 'Ventas' },
      { id: 2, nombre: 'Marketing' },
      { id: 3, nombre: 'Desarrollo' },
      { id: 4, nombre: 'Soporte' },
    ];
    setAreas(fetchedAreas);
  }, []);

  useEffect(() => {
    if (empleadoToEdit) {
      setForm({
        nombre: empleadoToEdit.nombre || '',
        email: empleadoToEdit.email || '',
        sexo: empleadoToEdit.sexo || 'M',
        area_id: empleadoToEdit.area_id || '',
        boletin: empleadoToEdit.boletin || false,
        descripcion: empleadoToEdit.descripcion || '',
        id: empleadoToEdit.id
      });
    } else {
      setForm(initialState);
    }
  }, [empleadoToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
    setMensaje('');
  };

  const validar = () => {
    setError('');
    setMensaje('');

    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio.');
      return false;
    }
    if (!form.email.trim()) {
      setError('El email es obligatorio.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('El formato del correo no es válido.');
      return false;
    }
    if (!form.sexo) {
      setError('El sexo es obligatorio.');
      return false;
    }
    if (!form.area_id) {
      setError('Debe seleccionar un área.');
      return false;
    }
    if (!form.descripcion.trim()) {
      setError('La descripción es obligatoria.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) {
      return;
    }

    try {
      if (form.id) {
        const res = await axios.put(`http://localhost:3000/empleados/${form.id}`, form);
        setMensaje(res.data.mensaje || "Empleado actualizado con éxito.");
      } else {
        const res = await axios.post('http://localhost:3000/empleados', form);
        setMensaje(res.data.mensaje || "Empleado creado con éxito.");
        setForm(initialState);
      }
      if (onEmpleadoSaved) {
        onEmpleadoSaved();
      }
    } catch (err) {
      console.error('Error en la operación:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Error al realizar la operación.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>{form.id ? 'Editar Empleado' : 'Crear Nuevo Empleado'}</h2>
      <Notificaciones mensaje={mensaje} error={error} />
      <form onSubmit={handleSubmit} className="form-group">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <fieldset className="radio-group">
          <legend>Sexo:</legend>
          <label>
            <input
              type="radio"
              name="sexo"
              value="M"
              checked={form.sexo === 'M'}
              onChange={handleChange}
              required
            /> Masculino
          </label>
          <label>
            <input
              type="radio"
              name="sexo"
              value="F"
              checked={form.sexo === 'F'}
              onChange={handleChange}
              required
            /> Femenino
          </label>
        </fieldset>

        <label>
          Área:
          <select
            name="area_id"
            value={form.area_id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un área</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-group">
          <input
            type="checkbox"
            name="boletin"
            checked={form.boletin}
            onChange={handleChange}
          /> Recibir boletín
        </label>

        <label>
          Descripción:
          <textarea
            name="descripcion"
            placeholder="Descripción del empleado"
            value={form.descripcion}
            onChange={handleChange}
            required
            rows="4"
          ></textarea>
        </label>

        <button type="submit" className="form-button primary">
          {form.id ? 'Actualizar Empleado' : 'Guardar Empleado'}
        </button>
        {form.id && (
          <button
            type="button"
            onClick={() => {
              setForm(initialState);
              setError('');
              setMensaje('');
              if (onEmpleadoSaved) onEmpleadoSaved();
            }}
            className="form-button secondary cancel"
          >
            Cancelar Edición
          </button>
        )}
      </form>
    </div>
  );
}

export default FormularioEmpleado;