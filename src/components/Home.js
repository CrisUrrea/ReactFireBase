import React from 'react'
import firebaseApp from '../credenciales'
import {getAuth, signOut} from 'firebase/auth'

const auth = getAuth(firebaseApp);

const Home = ({correoUsuario}) => {
  return (
    <div className="container">
      <p>Bienvenido, <strong>{correoUsuario}</strong> haz iniciado sesión</p>
      <button className='btn btn-primary' onClick={() => signOut(auth)}>Cerrar Sesión</button>
      <hr></hr>
      <div className='row'>
        {/* Esta seccion sera del formulario */}
        <div className='col-md-4'>
          <h3 className='text-center mb-3'>Ingresar Usuario</h3>
          <form>
            <div className='card card-body'>
              <div className='form-group'>
                <input type='text' name='nombre' className='form-control mb-3' placeholder='Ingresar el nombre de usuario'></input>
                <input type='text' name='edad' className='form-control mb-3' placeholder='Ingresar la edad del usuario'></input>
                <input type='text' name='profesion' className='form-control mb-3' placeholder='Ingresar la profesión del usuario'></input>
              </div>
              <button className='btn btn-success'>Guardar</button>
            </div>
          </form>
        </div>
        <div className='col-md-8'>
          <h2 className='text-center mb-5'>Lista de Usuarios</h2>
        </div>
      </div>
    </div>
  )
}

export default Home