import { getAllMarca } from '../../repositories/marca.repository.js';

const getAllMarcaService = async () => {
    try{
        return await getAllMarca();
    }catch (error) {
        throw new Error("Error al obtener las marcas: " + error.message);
    }
}

export default getAllMarcaService;