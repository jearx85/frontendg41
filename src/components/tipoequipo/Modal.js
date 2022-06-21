import React, { useEffect, useState } from 'react'
import { obtenerTodosUsuarios } from '../../services/UsuarioService';

export default function Modal({tipo, usuario, loading, closeModal, hidden, changeTipo, error, add}) {
  const [usuarios, setUsuarios] = useState([]);
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
  return (
    <div 
    className="modal fade" id="modalTipo" 
    tabIndex="-1" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalTipo">{tipo._id ? 'Editar tipo': 'Nuevo tipo'}</h5>
          {
            (loading && <div class="spinner-grow spinner-grow-sm" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>)
          }
          
          <button 
            type="button" 
            className="btn-close" 
            data-bs-dismiss="modal" 
            aria-label="Close"
            onClick={closeModal}
          >
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={add}>
            <input type={hidden} name="_id" value={tipo._id}></input>
            <div className="mb-3">
              <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Nombre:
              </label>
              <input 
                disabled={tipo._id ? true : false}
                readOnly={tipo._id ? true : false}
                required
                value={tipo.nombre}
                name="nombre"
                type="text" 
                className="form-control"              
                onChange={changeTipo}     
                
                
              />
               <label 
                htmlFor="recipient-name" 
                className="col-form-label"
              >
                Email usuario:
              </label>
              <input 
                disabled={tipo._id ? true : false}
                readOnly={tipo._id ? true : false}
                required
                value={tipo.email}
                name="email"
                type="text" 
                className="form-control"
                onChange={changeTipo}                
              />
                
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">estado:</label>
              <select
                disabled={tipo._id ? false : true}
                readOnly={tipo._id ? false : true}
                required
                className="form-select" 
                aria-label="Default select example"
                value={tipo.tipo}
                name="tipo"
                onChange={changeTipo}
              >
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
              </select>
            </div>
            <div className="modal-footer">
            <div className={error ? 'alert alert-danger': 'd-none'} role="alert">
              ¡Ha ocurrido un error!
            </div>
              <button 
                type="button" 
                className="btn btn-secondary" data-bs-dismiss="modal"
                onClick={closeModal}
              >
                Close
              </button>
              {
                loading ? (<button class="btn btn-primary" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
                  </button>) : (<button type="submit" className="btn btn-primary">
                    Guardar
                  </button>)
              }
            </div>
          </form>
            </div>
        </div>
        </div>
    </div>
  )
}
