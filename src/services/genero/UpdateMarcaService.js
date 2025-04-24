import { updateGenero } from '../../repositories/genero.repository.js';

const updateGeneroService = async (id, data) => {
    try{
        const result = await updateGenero(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateGeneroService;