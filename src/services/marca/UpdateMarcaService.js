import { updateMarca } from '../../repositories/marca.repository.js';

const updateMarcaService = async (id, data) => {
    try{
        const result = await updateMarca(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar la marca: " + error.message);
    }
}

export default updateMarcaService;