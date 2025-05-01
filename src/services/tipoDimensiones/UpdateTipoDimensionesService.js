import { updateTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';

const updateTipoDimensionesService = async (id, data) => {
    try{
        const result = await updateTipoDimensiones(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateTipoDimensionesService;