import { updateColor } from '../../repositories/color.repository.js';

const updateColorService = async (id, data) => {
    try{
        const result = await updateColor(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el color: " + error.message);
    }
}

export default updateColorService;