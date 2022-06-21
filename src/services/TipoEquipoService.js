import { axiosConfig } from "../config/axiosConfig"

export const todosLosTipos = () => {
    return axiosConfig.get(
        '/tiposEquipo'
    );
}

export const tiposPorId = (id) => {
    return axiosConfig.get(
        `/tiposEquipo/${id}`
    );
}

export const crearTipo = (tipo) => {
    return axiosConfig.post('/tiposEquipo', tipo)
}

export const eliminarTipo = (id, tipo) => {
    return axiosConfig.delete(
        /tiposEquipo/ +id, tipo
    )
}