import React, { useEffect, useState } from 'react'
import firebaseApp from '../credenciales'
import {getAuth, signOut} from 'firebase/auth'
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore'

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const Home = ({correoUsuario}) => {

  const valorInicial = {
    nombre: '',
    edad: '',
    profesion: ''
  }

  const [user, setUser] = useState(valorInicial);
  const [lista, setLista] = useState([]);

  const capturarInputs = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]:value});
  }

  const guardarDatos = async(e) => {
    e.preventDefault();
    // console.log(user);
    try{
      await addDoc(collection(db, 'usuarios'), {
        ...user
      })
    } catch (error){
      console.error(error);
    }
    setUser({...valorInicial});
  }

  useEffect(() =>{
    const getLista = async() => {
      try{
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({...doc.data(), id:doc.id});
        });
        setLista(docs)
      } catch (error){
        console.error(error);
      }
    }
    getLista()
  }, [lista])

  // funcion para eliminar usuario
  const deleteUser = async(id) =>{
    await deleteDoc(doc(db,'usuarios',id))
  }

  return (
    <div className="container">
      <p>Bienvenido, <strong>{correoUsuario}</strong> haz iniciado sesión</p>
      <button className='btn btn-primary' onClick={() => signOut(auth)}>Cerrar Sesión</button>
      <hr></hr>
      <div className='row'>
        {/* Esta seccion sera del formulario */}
        <div className='col-md-4'>
          <h3 className='text-center mb-3'>Ingresar Usuario</h3>
          <form onSubmit={guardarDatos}>
            <div className='card card-body'>
              <div className='form-group'>
                <input type='text' name='nombre' className='form-control mb-3' placeholder='Ingresar el nombre de usuario' onChange={capturarInputs} value={user.nombre}></input>
                <input type='text' name='edad' className='form-control mb-3' placeholder='Ingresar la edad del usuario' onChange={capturarInputs} value={user.edad}></input>
                <input type='text' name='profesion' className='form-control mb-3' placeholder='Ingresar la profesión del usuario' onChange={capturarInputs} value={user.profesion}></input>
              </div>
              <button className='btn btn-success'>Guardar</button>
            </div>
          </form>
        </div>
        {/* Esta seccion sera la lista de nuestros usuarios */}
        <div className='col-md-8'>
          <h2 className='text-center mb-5'>Lista de Usuarios</h2>
          <div className='container card'>
            <div className='card-body'>
              {
                lista.map(List => (
                  <div key={List.id}>
                    <p>Nombre: {List.nombre}</p>
                    <p>Edad: {List.edad}</p>
                    <p>Profesión: {List.profesion}</p>

                    <button className='btn btn-danger' onClick={() => deleteUser(List.id)}>Eliminar</button>
                    <button className='btn btn-success m-1'>Actualizar</button>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home