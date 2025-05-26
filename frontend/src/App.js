import React from "react";
import FormularioEmpleado from "./Components/FormularioEmpleado";
import ListaEmpleados from "./Components/ListaEmpleados";
import Notificaciones from "./Components/Notificaciones";

function App() {
  return (
    <div className="App">
      <h1>Gestión de empleados</h1>
      <Notificaciones />
      <FormularioEmpleado />
      <ListaEmpleados />
    </div>
  );
}

export default App;
