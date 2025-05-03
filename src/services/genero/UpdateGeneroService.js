import { updateGenero } from '../../repositories/genero.repository.js';
import validaDatos from './validaDatos.js';

const updateGeneroService = async (id, data) => {
    try{
        validaDatos(data);
        const result = await updateGenero(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateGeneroService;