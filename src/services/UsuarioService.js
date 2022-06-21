import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodosUsuarios = () => {
  return axiosConfig.get(
      '/usuarios'
  );
}

export const obtenerUsuarioId = (id) => {
  return axiosConfig.get(
      `/usuarios/${id}`
  );
}

export const crearUsuario = (usuario) => {  
  return axiosConfig.post('/usuarios',usuario);
}
export const eliminarUsuario = (id, usuario) => {
  return axiosConfig.delete(
      /usuarios/+id, usuario
  );
}