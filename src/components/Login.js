import React, { useState } from 'react'
import im1 from '../images/imagen1.jpg'
import im2 from '../images/imagen2.jpg'
import im3 from '../images/imagen3.jpg'

import firebaseApp from '../credenciales.js'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const auth = getAuth(firebaseApp);

const Login = () => {

  const [registro, setRegistro] = useState(false);

  const handlerSubmit = async(e)=>{
    e.preventDefault()
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;

    if(registro){
      await createUserWithEmailAndPassword(auth, correo, contraseña);
    } else {
      await signInWithEmailAndPassword(auth, correo, contraseña);
    }
  }

  return (
    <div className='row container p-4'>
      {/* Creamos nuestro slider */}
      <div className='col-md-8'>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={im1} alt='' className='tamaño-imagen'></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={im2} alt='' className='tamaño-imagen'></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src={im3} alt='' className='tamaño-imagen'></img>
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Seccion para el formulario */}
      <div className='col-md-4'>
        <div className='mt-5 ms-5'>
          <h1>{registro ? 'Registrate' : 'Inicia Sesión'}</h1>
          <form onSubmit={handlerSubmit}>
            <div className='mb-3'>
              <label className='form-label'>Direccion de Email</label>
              <input type='email' className='form-control' placeholder='Ingrese correo' id='email' required></input>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Contraseña</label>
              <input type='password' className='form-control' placeholder='Ingrese contraseña' id='password' required></input>
            </div>
            <button className='btn btn-primary' type='submit'>
              {registro ? 'Registrate' : 'Inicia Sesión'}
            </button>
            <div className='form-group'>
              <button className='btn btn-secondary mt-4 form-control' onClick={() => setRegistro(!registro)}>
                {registro ? '¿Ya tienes una cuenta?, Inicia Sesión' : '¿No tienes una cuenta?, Registrate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login