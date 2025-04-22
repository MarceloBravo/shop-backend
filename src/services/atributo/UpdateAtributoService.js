import { updateAtributo } from '../../repositories/atributo.repository.js';

const updateAtributoService = async (id, data) => {
    try{
        const result = await updateAtributo(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el atributo: " + error.message);
    }
}

export default updateAtributoService;