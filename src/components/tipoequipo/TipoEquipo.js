import React, { useEffect, useState } from 'react'
import { todosLosTipos, tiposPorId, crearTipo, eliminarTipo} from '../../services/TipoEquipoService';
import TablaTipos from '../iu/TablaTipos';
import Modal from './Modal';

export default function TipoEquipo() {

  const [tipos, setTipos] = useState([]);
  const [tipo, setTipo] = useState({
    _id: '',
    nombre: '',
    estado: true
  });
  const [error, setError] = useState(false);
  const [hidden] = useState('hidden');
  const [loading, setLoading] = useState(false);

  useEffect( () => {
    const getTipos = () => {
      todosLosTipos()
        .then(r => {
            console.log(r);
            setTipos(r.data)
        }).catch(e => {
            console.log(e)
        })
    }
    getTipos();
  }, []);

  const changeTipo = e => {
    e.preventDefault();
    setTipo({
      ...tipo,
      [e.target.name]: e.target.value 
    })
  }

  const add = e => {
    setLoading(true);
    e.preventDefault();
    console.log(tipo);
    if(tipo._id){
      editarTipo();
    }else{
      guardarTipo();
    }
    resetTipo();
  }

  const guardarTipo = () => {
    crearTipo(tipo)
    .then(r => {
      setTipos([...tipos, r.data]);
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const closeModal = () => {
    resetTipo()
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
      const tipoFilter = tipo.filter(est => est._id === id)[0];
      setTipo({
        ...tipoFilter
      });
    }, 500)
  }

  const editarTipo = () => {
    tiposPorId(tipo._id, tipo)
    .then(r => {
      console.log(r.data._id)
      const id = r.data._id;
      if(!r.data.tipo){
        const activos = tipos.filter(est => est._id !== id);
        setTipos(activos);
      }
      changeError(false)
      setLoading(false);
    }).catch(e => {
      console.log(e);
      changeError(true);
      setLoading(false);
    })
  }

  const resetTipo = () => {
    setTipo({
      _id: '',
      nombre: '',
      estado: true
    })
  } 

  const eliminarT = e => {
    e.preventDefault();
    setLoading(true);
    const id = e.target.getAttribute('data');
    eliminarTipo(id)
    .then(r => {
      const activos = tipos.filter(est => est._id !== id);
      setTipos(activos);
      setLoading(false);
    }).catch(e => {
      console.log(e);
      setLoading(false);
    })
  }


  return (
    <div className='container'>
      <button 
        onClick={resetTipo}
        type="button" 
        className="btn btn-outline-primary"
        data-bs-toggle="modal" 
        data-bs-target="#modalTipo"
      >
        <i className="fa-solid fa-plus"></i>
        Agregar
      </button>
      <TablaTipos 
        componentes={tipos}
        openEditById={openEditById}
        eliminar={eliminarT}
      />
      <Modal 
        tipo={tipo}
        loading={loading}
        closeModal={closeModal}
        hidden={hidden}
        changeTipo={changeTipo}
        error={error}
        add={add}
      /> 
    </div>
  )
}

