import { axiosConfig } from "../config/axiosConfig"

export const obtenerTodasLasMarcas = () => {
    return axiosConfig.get(
        '/marcas'
        );
}

export const obtenerMarcaId =(id) => {
    return axiosConfig.get(
     `/marcas/${id}`
    );
}

export const crearMarca =(marca) => {
    return axiosConfig.post('/marcas', marca)
}

export const eliminarMarcaId =(id, marca) => {
    return axiosConfig.delete(
        /marcas/ + id, marca
    )
}