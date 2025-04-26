import { updateMaterial } from '../../repositories/material.repository.js';

const updateMaterialService = async (id, data) => {
    try{
        const result = await updateMaterial(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateMaterialService;