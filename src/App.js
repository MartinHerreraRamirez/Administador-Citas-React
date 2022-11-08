import React, {Fragment, useEffect, useState} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en Local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'))

  if(!citasIniciales){
    citasIniciales = []
  }

  // State - arreglo de todas las citas.
  const [ citas, guardarCitas] = useState(citasIniciales)

  // Use effect para realizar  ciertas operaciones cuando el state cambia.

  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'))

    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }     
  }, [citas])

  // Crear funcion que tome las citas actuales y agrege las nuevas.

  const crearCita = (cita) =>{
    guardarCitas([
      ...citas,
      cita
    ])
  }

  // Funcion que elimina una cita por su ID.
  const eliminarCita = (id) =>{
    const nuevasCitas = citas.filter( cita => cita.id !== id )
    guardarCitas(nuevasCitas)
  }

  // Mensaje condicional

  const titulo = citas.length ===  0 ? 'No hay Citas' : 'Agregar tus Citas'

  return (
    <Fragment>
      
      <h1>ADMINISTRADOR DE PACIENTES</h1>

      <div className='container'>

        <div className='row'>

          <div className='one-half column'>

            <Formulario 
                crearCita={crearCita}
            />

          </div>

          <div className='one-half column'>
                <h2>{titulo}</h2>
              {citas.map( cita => (
                <Cita 
                  key={cita.id}
                  cita={cita}
                  citas={citas}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>

        </div>

      </div>
    </Fragment>
  );
}

export default App;
