import React, {Fragment, useState} from 'react';
import {v4} from 'uuid'
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    // Crear State para leer los campos
    const [cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    })

    // State para manejo de errores en campos vacios.

    const [ error, actualizarError] = useState(false)

    // Funcion que se ejecuta, cada vez que el usuario escribe en un input

    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    }

    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas }  = cita

    // Cuando se envia el formulario

    const submitCita = (e) =>{
        e.preventDefault()
        console.log('enviando form')

        // Validar
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === ''
            || hora.trim() === '' || sintomas.trim() === ''){
                actualizarError(true)
                return
            }

        // Eliminar mensaje previo
        actualizarError(false)

        // Asignar un ID
        cita.id = {v4}
        
        // Crear la cita
        crearCita(cita)

        // Reiniciar el FORM
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })

    }
    
    return ( 
        <Fragment>

            {error
            ? <p className='alerta-error'>Todos los campos son requeridos</p>
            : null
            }

            <h2>Crear Cita</h2>

            <form 
                onSubmit={submitCita}
            >

                <label htmlFor=''>Mascota:</label>
                <input 
                    type='text'
                    name='mascota'
                    className='u-full-width'
                    placeholder='Nombre Mascota'
                    value={mascota}
                    onChange={actualizarState}
                />

                <label htmlFor=''>Propietario:</label>
                <input 
                    type='text'
                    name='propietario'
                    className='u-full-width'
                    placeholder='Nombre Dueño'
                    value={propietario}
                    onChange={actualizarState}
                />

                <label htmlFor=''>Fecha:</label>
                <input 
                    type='date'
                    name='fecha'
                    className='u-full-width'
                    value={fecha}
                    onChange={actualizarState}
                />

                <label htmlFor=''>Hora:</label>
                <input 
                    type='time'
                    name='hora'
                    className='u-full-width'
                    value={hora}
                    onChange={actualizarState}
                />

                <label htmlFor=''>Sintomas:</label>
                <textarea 
                    name='sintomas' 
                    className='u-full-width'
                    value={sintomas}
                    onChange={actualizarState}
                ></textarea>

                <button
                    type='submit'
                    className='u-full-width button-primary'
                    onChange={actualizarState}
                >Agregar Cita</button>

            
            </form>
        </Fragment>
     );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}
 
export default Formulario;