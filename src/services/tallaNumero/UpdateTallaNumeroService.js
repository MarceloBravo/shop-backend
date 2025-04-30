import { updateTallaNumero } from '../../repositories/tallaNumero.repository.js';

const updateTallaNumeroService = async (id, data) => {
    try{
        const result = await updateTallaNumero(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateTallaNumeroService;