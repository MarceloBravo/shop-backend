import { updateSubCategoria } from '../../repositories/subCategoria.repository.js';
import validaDatos from './validaDatos.js';

const updateSubCategoriaService = async (id, data) => {
    try{
        await validaDatos(data);
        const result = await updateSubCategoria(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateSubCategoriaService;