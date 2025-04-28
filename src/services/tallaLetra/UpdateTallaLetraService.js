import { updateTallaLetra } from '../../repositories/tallaLetra.repository.js';

const updateTallaLetraService = async (id, data) => {
    try{
        const result = await updateTallaLetra(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateTallaLetraService;