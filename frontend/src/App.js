import React, { useState } from "react";
import FormularioEmpleado from "./Components/FormularioEmpleado"; 
import ListaEmpleados from "./Components/ListaEmpleados";

function App() {
  const [empleadoToEdit, setEmpleadoToEdit] = useState(null);
  const [refreshList, setRefreshList] = useState(0);

  const handleEdit = (empleado) => {
    setEmpleadoToEdit(empleado);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmpleadoSaved = () => {
    setRefreshList(prev => prev + 1);
    setEmpleadoToEdit(null);
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Gestión de Empleados</h1>

      <FormularioEmpleado
        empleadoToEdit={empleadoToEdit}
        onEmpleadoSaved={handleEmpleadoSaved}
      />

      <ListaEmpleados
        onEdit={handleEdit}
        onRefresh={refreshList}
      />
    </div>
  );
}

export default App;