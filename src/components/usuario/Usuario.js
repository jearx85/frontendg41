
import React, { useEffect, useState }  from 'react'
import {obtenerTodosUsuarios, crearUsuario, obtenerUsuarioId, eliminarUsuario} from '../../services/UsuarioService';
import TablaUsuario from '../iu/TablaUsuario';
import Modal from './Modal'

export default function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({
    _id: '',
    nombre: '',
    email: '',
    estado: true
  });
  const [error, setError] = useState(false);
  const [hidden] = useState('hidden');
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const getUsuarios = () => {
        obtenerTodosUsuarios()
        .then(r => {
            console.log(r);
            setUsuarios(r.data)
        }).catch(e => {
            console.log(e)
        })
    }
    getUsuarios();
  }, []);

  const changeUsuario = e => {
    e.preventDefault();
    setUsuario({
      ...usuarios,
      [e.target.name]: e.target.value 
    })
  }

  const add = e => {
    setLoading(true);
    e.preventDefault();
    console.log(usuario);
    if(usuarios._id){
      editarUsuario();
    }else{
      guardarUsuario();
    }
    resetUsuario();
  }

  const guardarUsuario = () => {
    crearUsuario(usuarios)
    .then(r => {
      setUsuarios([...usuarios, r.data]);
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const closeModal = () => {
    resetUsuario()
    changeError(false)
  }

  const changeError = e => {
    setError(e);
  }

  const openEditById = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const id = e.target.getAttribute('data');
      console.log(id)
      const usuarioFilter = usuarios.filter(est => est._id === id)[0];
      setUsuario({
        ...usuarioFilter
      });
    }, 500)
  }

  const editarUsuario = () => {
    obtenerUsuarioId(usuario._id, usuario)
    .then(r => {
      console.log(r.data._id)
      const id = r.data._id;
      if(!r.data.usuario){
        const activos = usuarios.filter(est => est._id !== id);
        setUsuarios(activos);
      }
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const resetUsuario = () => {
    setUsuario({
      _id: '',
      nombre: '',
      estado: true
    })
  }

  const eliminarUser = e => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.getAttribute('data');
    eliminarUsuario(id)
    .then(r => {
      const activos = usuarios.filter(est => est._id !== id);
      setUsuarios(activos);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    })
  }
  return (
    <div className='container'>
      <button 
        onClick={resetUsuario}
        type="button" 
        className="btn btn-outline-primary"
        data-bs-toggle="modal" 
        data-bs-target="#modalUser"
      >
        <i className="fa-solid fa-plus"></i>
        Agregar
      </button>
      <TablaUsuario 
        componentes={usuarios}
        openEditById={openEditById}
        eliminar={eliminarUser}
      />
      <Modal
        usuario={usuario}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeUsuario={changeUsuario}
        error={error}
        add={add}
      />
    </div>
  )
}
