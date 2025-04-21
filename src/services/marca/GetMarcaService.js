import { getMarca } from '../../repositories/marca.repository.js';

const getMarcaService = async (id) => {
    try{
        return await getMarca(id);
    }catch (error) {
        throw new Error("Error al obtener la marca: " + error.message);
    }
}

export default getMarcaService;